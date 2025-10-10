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
exports.FitouraService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let FitouraService = class FitouraService {
    constructor(fitouraModel) {
        this.fitouraModel = fitouraModel;
    }
    async enregistrerEntree(dto) {
        const newOp = new this.fitouraModel({
            matriculeCamion: dto.matriculeCamion,
            chauffeur: dto.chauffeur,
            poidsEntree: dto.poidsEntree,
            prixUnitaire: dto.prixUnitaire,
            status: 'EN_COURS',
        });
        return await newOp.save();
    }
    async enregistrerSortie(id, dto) {
        const operation = await this.fitouraModel.findById(id);
        if (!operation)
            throw new common_1.NotFoundException('Opération non trouvée');
        const poidsNet = dto.poidsSortie - operation.poidsEntree;
        const montantTotal = poidsNet * operation.prixUnitaire;
        operation.poidsSortie = dto.poidsSortie;
        operation.poidsNet = poidsNet;
        operation.montantTotal = montantTotal;
        operation.dateSortie = new Date();
        operation.status = 'TERMINE';
        return operation.save();
    }
    async modifierFitouraManuellement(id, dto) {
        const operation = await this.fitouraModel.findById(id);
        if (!operation)
            throw new common_1.NotFoundException('Fitoura non trouvée');
        Object.assign(operation, dto);
        if (dto.poidsEntree !== undefined && dto.poidsSortie !== undefined && dto.prixUnitaire !== undefined) {
            const poidsNet = dto.poidsSortie - dto.poidsEntree;
            const montantTotal = poidsNet * dto.prixUnitaire;
            operation.poidsNet = poidsNet;
            operation.montantTotal = montantTotal;
        }
        operation.updatedAt = new Date();
        return operation.save();
    }
    async findAll() {
        return this.fitouraModel.find().sort({ createdAt: -1 });
    }
    async findOne(id) {
        const op = await this.fitouraModel.findById(id);
        if (!op)
            throw new common_1.NotFoundException('Fitoura non trouvée');
        return op;
    }
    async delete(id) {
        await this.fitouraModel.findByIdAndDelete(id);
    }
};
exports.FitouraService = FitouraService;
exports.FitouraService = FitouraService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Fitoura')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FitouraService);
//# sourceMappingURL=fitoura.service.js.map