"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const employe_schema_1 = require("../schema/employe.schema");
function isYMD(s) {
    return /^\d{4}-\d{2}-\d{2}$/.test(s);
}
function toYMD(input) {
    if (typeof input === 'string' && isYMD(input))
        return input;
    const d = input instanceof Date ? input : new Date(input);
    if (isNaN(d.getTime()))
        return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}
function parseMonth(month) {
    const [yStr, mStr] = (month || '').split('-');
    const y = Number(yStr);
    const m = Number(mStr);
    if (!y || !m || m < 1 || m > 12)
        throw new common_1.BadRequestException('month invalide: format YYYY-MM');
    return { y, m };
}
function inMonth(dateAny, month) {
    const ymd = toYMD(dateAny);
    return ymd ? ymd.startsWith(month) : false;
}
function startOfMonth(y, m) {
    return new Date(y, m - 1, 1, 0, 0, 0, 0);
}
function endOfMonth(y, m) {
    return new Date(y, m, 0, 23, 59, 59, 999);
}
function minDate(a, b) {
    return a.getTime() <= b.getTime() ? a : b;
}
function maxDate(a, b) {
    return a.getTime() >= b.getTime() ? a : b;
}
function countDaysByWeekdaysInRange(start, end, weekDays) {
    const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    if (s > e)
        return 0;
    let c = 0;
    for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
        if (weekDays.includes(d.getDay()))
            c++;
    }
    return c;
}
function jtToDate(item) {
    if (!item)
        return null;
    if (item instanceof Date)
        return isNaN(item.getTime()) ? null : item;
    const raw = typeof item === 'string' ? item : item?.date;
    const d = new Date(raw);
    return isNaN(d.getTime()) ? null : d;
}
let EmployeService = class EmployeService {
    constructor(employeModel) {
        this.employeModel = employeModel;
    }
    async create(createEmployeDto) {
        const employe = new this.employeModel(createEmployeDto);
        return employe.save();
    }
    async findAll() {
        return this.employeModel.find().exec();
    }
    async findOne(id) {
        const employe = await this.employeModel.findById(id).exec();
        if (!employe)
            throw new common_1.NotFoundException('Employé non trouvé');
        return employe;
    }
    async update(id, updateEmployeDto) {
        const employe = await this.employeModel.findByIdAndUpdate(id, { ...updateEmployeDto, updatedAt: new Date() }, { new: true, runValidators: true });
        if (!employe)
            throw new common_1.NotFoundException(`Employé avec l'ID ${id} non trouvé`);
        return employe;
    }
    async remove(id) {
        const result = await this.employeModel.findByIdAndDelete(id).exec();
        if (!result)
            throw new common_1.NotFoundException('Employé non trouvé');
    }
    async addAbsence(id, date, motif, type = 'ABSENT') {
        const ymd = toYMD(date);
        if (!ymd)
            throw new common_1.BadRequestException('date invalide (YYYY-MM-DD)');
        await this.employeModel.updateOne({ _id: id }, { $pull: { absences: { date: ymd } } }, { runValidators: true });
        const employe = await this.employeModel.findByIdAndUpdate(id, { $push: { absences: { date: ymd, motif: motif || undefined, type } } }, { new: true, runValidators: true });
        if (!employe)
            throw new common_1.NotFoundException('Employé non trouvé');
        return employe;
    }
    async removeAbsence(id, date) {
        const ymd = toYMD(date);
        if (!ymd)
            throw new common_1.BadRequestException('date invalide (YYYY-MM-DD)');
        const employe = await this.employeModel.findByIdAndUpdate(id, { $pull: { absences: { date: ymd } } }, { new: true, runValidators: true });
        if (!employe)
            throw new common_1.NotFoundException('Employé non trouvé');
        return employe;
    }
    async addAdvance(id, payload) {
        const ymd = toYMD(payload.date);
        if (!ymd)
            throw new common_1.BadRequestException('date avance invalide (YYYY-MM-DD)');
        const montant = Number(payload.montant || 0);
        if (montant <= 0)
            throw new common_1.BadRequestException('montant invalide');
        const employe = await this.employeModel.findByIdAndUpdate(id, { $push: { avances: { date: ymd, montant, mode: payload.mode, note: payload.note || undefined } } }, { new: true, runValidators: true });
        if (!employe)
            throw new common_1.NotFoundException('Employé non trouvé');
        return employe;
    }
    async resumeMensuel(id, month) {
        const employe = await this.findOne(id);
        const { y, m } = parseMonth(month);
        const weekDays = Array.isArray(employe.joursSemaineTravail) && employe.joursSemaineTravail.length
            ? employe.joursSemaineTravail
            : [0, 1, 2, 3, 4, 5, 6];
        const now = new Date();
        const nowYM = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const ym = `${y}-${String(m).padStart(2, '0')}`;
        if (ym > nowYM) {
            return { employeId: employe._id, nom: employe.nom, prenom: employe.prenom, poste: employe.poste, month, plannedDays: 0, absences: 0, workedDays: 0, base: 0, brut: 0, totalAdvances: 0, net: 0, window: null };
        }
        const monthStart = startOfMonth(y, m);
        const monthEnd = endOfMonth(y, m);
        const endConsidered = ym === nowYM ? now : monthEnd;
        const startPresenceYMD = employe.dateDebutPresence ? String(employe.dateDebutPresence) : null;
        const startPresence = startPresenceYMD
            ? new Date(`${startPresenceYMD}T00:00:00`)
            : employe.createdAt
                ? new Date(employe.createdAt)
                : monthStart;
        const startConsidered = maxDate(monthStart, new Date(startPresence.getFullYear(), startPresence.getMonth(), startPresence.getDate()));
        const endPresenceYMD = employe.dateFinPresence ? String(employe.dateFinPresence) : null;
        const endPresence = endPresenceYMD ? new Date(`${endPresenceYMD}T23:59:59`) : null;
        const realEnd = endPresence ? minDate(endConsidered, endPresence) : endConsidered;
        if (startConsidered.getTime() > realEnd.getTime()) {
            return { employeId: employe._id, nom: employe.nom, prenom: employe.prenom, poste: employe.poste, month, plannedDays: 0, absences: 0, workedDays: 0, base: 0, brut: 0, totalAdvances: 0, net: 0, window: { start: toYMD(startConsidered), end: toYMD(realEnd) } };
        }
        const plannedDays = countDaysByWeekdaysInRange(startConsidered, realEnd, weekDays);
        const absAll = Array.isArray(employe.absences) ? employe.absences : [];
        const abs = absAll.filter((a) => {
            if (!a?.date)
                return false;
            const d = new Date(`${toYMD(a.date)}T00:00:00`);
            if (isNaN(d.getTime()))
                return false;
            if (!inMonth(a.date, month))
                return false;
            if (!weekDays.includes(d.getDay()))
                return false;
            return d.getTime() >= startConsidered.getTime() && d.getTime() <= realEnd.getTime();
        });
        const absCount = abs.length;
        const workedDays = Math.max(plannedDays - absCount, 0);
        const advAll = Array.isArray(employe.avances) ? employe.avances : [];
        const advances = advAll.filter((a) => {
            if (!a?.date)
                return false;
            const d = new Date(`${toYMD(a.date)}T00:00:00`);
            if (isNaN(d.getTime()))
                return false;
            if (!inMonth(a.date, month))
                return false;
            return d.getTime() >= startConsidered.getTime() && d.getTime() <= realEnd.getTime();
        });
        const totalAdvances = advances.reduce((s, a) => s + (Number(a.montant) || 0), 0);
        const base = workedDays * (Number(employe.montantJournalier) || 0);
        const brut = base;
        const net = brut - totalAdvances;
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
        };
    }
    async resumeMensuelAll(month) {
        const list = await this.findAll();
        const items = await Promise.all(list.map((e) => this.resumeMensuel(String(e._id), month)));
        return { month, items };
    }
    async marquerJourCommePaye(id, body) {
        const employe = await this.employeModel.findById(id);
        if (!employe)
            throw new common_1.NotFoundException('Employé non trouvé');
        const date = toYMD(body.date);
        if (!date)
            throw new common_1.BadRequestException('date invalide (YYYY-MM-DD)');
        employe.joursPayes = employe.joursPayes || [];
        employe.joursPayes = employe.joursPayes.filter((p) => {
            const d = toYMD(typeof p === 'string' ? p : p?.date);
            return d !== date;
        });
        employe.joursPayes.push({
            date,
            heuresSup: Number(body.heuresSup || 0),
            mode: body.mode ?? 'NOTE',
            commentaire: body.commentaire,
            montant: body.montant,
        });
        await employe.save();
        return { success: true, employe };
    }
    async markPresence(id) {
        const employe = await this.findOne(id);
        const todayYMD = toYMD(new Date());
        if (!todayYMD)
            throw new common_1.BadRequestException('date invalide');
        employe.joursTravailles = employe.joursTravailles || [];
        const exists = (employe.joursTravailles || []).some((j) => {
            const d = jtToDate(j);
            return d ? toYMD(d) === todayYMD : false;
        });
        if (!exists) {
            ;
            employe.joursTravailles.push({ date: todayYMD, heuresSup: 0 });
            await employe.save();
        }
        return employe;
    }
};
exports.EmployeService = EmployeService;
exports.EmployeService = EmployeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(employe_schema_1.Employe.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EmployeService);
//# sourceMappingURL=employe.service.js.map