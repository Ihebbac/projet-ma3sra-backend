import { PartialType } from '@nestjs/mapped-types'
import { CreateEmployeDto } from './create-employe.dto'
import { IsArray, IsInt, IsOptional, Matches, Max, Min } from 'class-validator'

export type AbsenceType = 'ABSENT' | 'CONGE_NON_PAYE'
export type AvanceMode = 'CAISSE' | 'NOTE'

export class UpdateEmployeDto extends PartialType(CreateEmployeDto) {
  // (re-déclarer optionnel si tu veux validation stricte même en update)
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'dateDebutPresence doit être YYYY-MM-DD' })
  dateDebutPresence?: string | null

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'dateFinPresence doit être YYYY-MM-DD' })
  dateFinPresence?: string | null

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(6, { each: true })
  joursSemaineTravail?: number[]

  // ✅ si tu fais PUT complet d'un employé, tu peux aussi accepter ces champs
  @IsOptional()
  absences?: { date: string; type?: AbsenceType; motif?: string }[]

  @IsOptional()
  avances?: { date: string; montant: number; mode: AvanceMode; note?: string }[]

  @IsOptional()
  joursPayes?: { date: string; heuresSup?: number }[]

  @IsOptional()
  joursTravailles?: { date: string; heuresSup?: number }[]
}