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
        const employe = await this.employeModel.findByIdAndUpdate(id, updateEmployeDto, { new: true }).exec();
        if (!employe)
            throw new common_1.NotFoundException('Employé non trouvé');
        return employe;
    }
    async remove(id) {
        const result = await this.employeModel.findByIdAndDelete(id).exec();
        if (!result)
            throw new common_1.NotFoundException('Employé non trouvé');
    }
    async markPresence(id) {
        const employe = await this.findOne(id);
        const today = new Date();
        const isAlreadyMarked = employe.joursTravailles.some((d) => d.toDateString() === today.toDateString());
        if (!isAlreadyMarked) {
            employe.joursTravailles.push(today);
            await employe.save();
        }
        return employe;
    }
    async calculSalaire(id, startDate, endDate) {
        const employe = await this.findOne(id);
        let joursTravailles = employe.joursTravailles;
        if (startDate && endDate) {
            joursTravailles = joursTravailles.filter((jour) => jour >= startDate && jour <= endDate);
        }
        const salaireTotal = joursTravailles.length * employe.montantJournalier;
        return salaireTotal;
    }
};
exports.EmployeService = EmployeService;
exports.EmployeService = EmployeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(employe_schema_1.Employe.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EmployeService);
//# sourceMappingURL=employe.service.js.map