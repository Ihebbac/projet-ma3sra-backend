import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Employe } from '../schema/employe.schema'
import { CreateEmployeDto } from './dto/create-employe.dto'
import { UpdateEmployeDto } from './dto/update-employe.dto'

function isYMD(s: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(s)
}

function toYMD(input: string | Date): string {
  if (typeof input === 'string' && isYMD(input)) return input
  const d = input instanceof Date ? input : new Date(input)
  if (isNaN(d.getTime())) return ''
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function parseMonth(month: string) {
  const [yStr, mStr] = (month || '').split('-')
  const y = Number(yStr)
  const m = Number(mStr)
  if (!y || !m || m < 1 || m > 12) throw new BadRequestException('month invalide: format YYYY-MM')
  return { y, m }
}

function inMonth(dateAny: string, month: string): boolean {
  const ymd = toYMD(dateAny)
  return ymd ? ymd.startsWith(month) : false
}

function startOfMonth(y: number, m: number) {
  return new Date(y, m - 1, 1, 0, 0, 0, 0)
}

function endOfMonth(y: number, m: number) {
  return new Date(y, m, 0, 23, 59, 59, 999)
}

function minDate(a: Date, b: Date) {
  return a.getTime() <= b.getTime() ? a : b
}

function maxDate(a: Date, b: Date) {
  return a.getTime() >= b.getTime() ? a : b
}

function countDaysByWeekdaysInRange(start: Date, end: Date, weekDays: number[]) {
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate())
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate())
  if (s > e) return 0
  let c = 0
  for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
    if (weekDays.includes(d.getDay())) c++
  }
  return c
}

function jtToDate(item: any): Date | null {
  if (!item) return null
  if (item instanceof Date) return isNaN(item.getTime()) ? null : item
  const raw = typeof item === 'string' ? item : item?.date
  const d = new Date(raw)
  return isNaN(d.getTime()) ? null : d
}

@Injectable()
export class EmployeService {
  constructor(
    @InjectModel(Employe.name)
    private employeModel: Model<Employe>,
  ) {}

  async create(createEmployeDto: CreateEmployeDto): Promise<Employe> {
    const employe = new this.employeModel(createEmployeDto)
    return employe.save()
  }

  async findAll(): Promise<Employe[]> {
    return this.employeModel.find().exec()
  }

  async findOne(id: string): Promise<Employe> {
    const employe = await this.employeModel.findById(id).exec()
    if (!employe) throw new NotFoundException('Employé non trouvé')
    return employe
  }

  async update(id: string, updateEmployeDto: UpdateEmployeDto): Promise<Employe> {
    const employe = await this.employeModel.findByIdAndUpdate(
      id,
      { ...updateEmployeDto, updatedAt: new Date() },
      { new: true, runValidators: true },
    )
    if (!employe) throw new NotFoundException(`Employé avec l'ID ${id} non trouvé`)
    return employe
  }

  async remove(id: string): Promise<void> {
    const result = await this.employeModel.findByIdAndDelete(id).exec()
    if (!result) throw new NotFoundException('Employé non trouvé')
  }

  // ✅ ABSENCE (atomique)
 async addAbsence(
  id: string,
  date: string,
  motif?: string,
  type: 'ABSENT' | 'CONGE_NON_PAYE' = 'ABSENT',
) {
  const ymd = toYMD(date)
  if (!ymd) throw new BadRequestException('date invalide (YYYY-MM-DD)')

  // 1) remove existing same day (safe)
  await this.employeModel.updateOne(
    { _id: id },
    { $pull: { absences: { date: ymd } } },
    { runValidators: true },
  )

  // 2) push new entry
  const employe = await this.employeModel.findByIdAndUpdate(
    id,
    { $push: { absences: { date: ymd, motif: motif || undefined, type } } },
    { new: true, runValidators: true },
  )

  if (!employe) throw new NotFoundException('Employé non trouvé')
  return employe
}

  async removeAbsence(id: string, date: string) {
    const ymd = toYMD(date)
    if (!ymd) throw new BadRequestException('date invalide (YYYY-MM-DD)')

    const employe = await this.employeModel.findByIdAndUpdate(
      id,
      { $pull: { absences: { date: ymd } } },
      { new: true, runValidators: true },
    )

    if (!employe) throw new NotFoundException('Employé non trouvé')
    return employe
  }

  // ✅ AVANCE (atomique)
  async addAdvance(id: string, payload: { date: string; montant: number; mode: 'CAISSE' | 'NOTE'; note?: string }) {
    const ymd = toYMD(payload.date)
    if (!ymd) throw new BadRequestException('date avance invalide (YYYY-MM-DD)')

    const montant = Number(payload.montant || 0)
    if (montant <= 0) throw new BadRequestException('montant invalide')

    const employe = await this.employeModel.findByIdAndUpdate(
      id,
      { $push: { avances: { date: ymd, montant, mode: payload.mode, note: payload.note || undefined } } },
      { new: true, runValidators: true },
    )

    if (!employe) throw new NotFoundException('Employé non trouvé')
    return employe
  }

  // ✅ RESUME MENSUEL
  async resumeMensuel(id: string, month: string) {
    const employe = await this.findOne(id)
    const { y, m } = parseMonth(month)

    const weekDays = Array.isArray((employe as any).joursSemaineTravail) && (employe as any).joursSemaineTravail.length
      ? (employe as any).joursSemaineTravail
      : [0, 1, 2, 3, 4, 5, 6]

    const now = new Date()
    const nowYM = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    const ym = `${y}-${String(m).padStart(2, '0')}`

    if (ym > nowYM) {
      return { employeId: employe._id, nom: employe.nom, prenom: employe.prenom, poste: employe.poste, month, plannedDays: 0, absences: 0, workedDays: 0, base: 0, brut: 0, totalAdvances: 0, net: 0, window: null }
    }

    const monthStart = startOfMonth(y, m)
    const monthEnd = endOfMonth(y, m)
    const endConsidered = ym === nowYM ? now : monthEnd

    const startPresenceYMD = (employe as any).dateDebutPresence ? String((employe as any).dateDebutPresence) : null
    const startPresence = startPresenceYMD
      ? new Date(`${startPresenceYMD}T00:00:00`)
      : (employe as any).createdAt
        ? new Date((employe as any).createdAt)
        : monthStart

    const startConsidered = maxDate(monthStart, new Date(startPresence.getFullYear(), startPresence.getMonth(), startPresence.getDate()))

    const endPresenceYMD = (employe as any).dateFinPresence ? String((employe as any).dateFinPresence) : null
    const endPresence = endPresenceYMD ? new Date(`${endPresenceYMD}T23:59:59`) : null
    const realEnd = endPresence ? minDate(endConsidered, endPresence) : endConsidered

    if (startConsidered.getTime() > realEnd.getTime()) {
      return { employeId: employe._id, nom: employe.nom, prenom: employe.prenom, poste: employe.poste, month, plannedDays: 0, absences: 0, workedDays: 0, base: 0, brut: 0, totalAdvances: 0, net: 0, window: { start: toYMD(startConsidered), end: toYMD(realEnd) } }
    }

    const plannedDays = countDaysByWeekdaysInRange(startConsidered, realEnd, weekDays)

    const absAll = Array.isArray((employe as any).absences) ? (employe as any).absences : []
    const abs = absAll.filter((a: any) => {
      if (!a?.date) return false
      const d = new Date(`${toYMD(a.date)}T00:00:00`)
      if (isNaN(d.getTime())) return false
      if (!inMonth(a.date, month)) return false
      if (!weekDays.includes(d.getDay())) return false
      return d.getTime() >= startConsidered.getTime() && d.getTime() <= realEnd.getTime()
    })
    const absCount = abs.length

    const workedDays = Math.max(plannedDays - absCount, 0)

    const advAll = Array.isArray((employe as any).avances) ? (employe as any).avances : []
    const advances = advAll.filter((a: any) => {
      if (!a?.date) return false
      const d = new Date(`${toYMD(a.date)}T00:00:00`)
      if (isNaN(d.getTime())) return false
      if (!inMonth(a.date, month)) return false
      return d.getTime() >= startConsidered.getTime() && d.getTime() <= realEnd.getTime()
    })
    const totalAdvances = advances.reduce((s: number, a: any) => s + (Number(a.montant) || 0), 0)

    const base = workedDays * (Number(employe.montantJournalier) || 0)
    const brut = base
    const net = brut - totalAdvances

    return {
      employeId: employe._id,
      nom: employe.nom,
      prenom: employe.prenom,
      poste: employe.poste,
      month,
      plannedDays,
      absences: absCount,
      workedDays,
      base,
      brut,
      totalAdvances,
      net,
      details: { absences: abs, avances: advances },
      window: { start: toYMD(startConsidered), end: toYMD(realEnd) },
    }
  }

  async resumeMensuelAll(month: string) {
    const list = await this.findAll()
    const items = await Promise.all(list.map((e) => this.resumeMensuel(String(e._id), month)))
    return { month, items }
  }

async marquerJourCommePaye(id: string, body: { date: string; heuresSup?: number; mode?: 'CAISSE'|'NOTE'; commentaire?: string; montant?: number }) {
  const employe = await this.employeModel.findById(id)
  if (!employe) throw new NotFoundException('Employé non trouvé')

  const date = toYMD(body.date)
  if (!date) throw new BadRequestException('date invalide (YYYY-MM-DD)')

  employe.joursPayes = employe.joursPayes || []

  // remplace si existe déjà
  employe.joursPayes = employe.joursPayes.filter((p: any) => {
    const d = toYMD(typeof p === 'string' ? p : p?.date)
    return d !== date
  })

  employe.joursPayes.push({
    date,
    heuresSup: Number(body.heuresSup || 0),
    mode: body.mode ?? 'NOTE',
    commentaire: body.commentaire,
    montant: body.montant, // optionnel
  })

  await employe.save()
  return { success: true, employe }
}

  async markPresence(id: string): Promise<Employe> {
    const employe = await this.findOne(id)
    const todayYMD = toYMD(new Date())
    if (!todayYMD) throw new BadRequestException('date invalide')

    ;(employe as any).joursTravailles = (employe as any).joursTravailles || []
    const exists = ((employe as any).joursTravailles || []).some((j: any) => {
      const d = jtToDate(j)
      return d ? toYMD(d) === todayYMD : false
    })

    if (!exists) {
      ;(employe as any).joursTravailles.push({ date: todayYMD, heuresSup: 0 })
      await employe.save()
    }

    return employe
  }
}