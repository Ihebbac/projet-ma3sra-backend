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
const fs = require("fs");
let FitouraService = class FitouraService {
    constructor(fitouraModel) {
        this.fitouraModel = fitouraModel;
    }
    normalizeString(value) {
        if (value === undefined || value === null)
            return null;
        const cleaned = String(value).trim();
        return cleaned.length ? cleaned : null;
    }
    recalculate(operation) {
        const poidsEntree = operation.poidsEntree !== null && operation.poidsEntree !== undefined
            ? Number(operation.poidsEntree)
            : null;
        const poidsSortie = operation.poidsSortie !== null && operation.poidsSortie !== undefined
            ? Number(operation.poidsSortie)
            : null;
        const prixUnitaire = operation.prixUnitaire !== null && operation.prixUnitaire !== undefined
            ? Number(operation.prixUnitaire)
            : null;
        if (poidsEntree !== null && poidsSortie !== null) {
            operation.poidsNet = poidsSortie - poidsEntree;
            operation.dateSortie = operation.dateSortie || new Date();
            operation.status = 'TERMINE';
        }
        else {
            operation.poidsNet = null;
            if (!operation.status) {
                operation.status = 'EN_COURS';
            }
        }
        if (operation.poidsNet !== null &&
            operation.poidsNet !== undefined &&
            prixUnitaire !== null) {
            operation.montantTotal = Number(operation.poidsNet) * prixUnitaire;
        }
        else {
            operation.montantTotal = null;
        }
        if (poidsSortie === null && operation.status === 'TERMINE') {
            operation.status = 'EN_COURS';
            operation.dateSortie = null;
        }
    }
    mapFiles(files = []) {
        return files.map((file) => ({
            originalName: file.originalname,
            filename: file.filename,
            path: file.path.replace(/\\/g, '/'),
            mimetype: file.mimetype,
            size: file.size,
            uploadedAt: new Date(),
        }));
    }
    async enregistrerEntree(dto, files = []) {
        const newOp = new this.fitouraModel({
            matriculeCamion: this.normalizeString(dto.matriculeCamion),
            chauffeur: this.normalizeString(dto.chauffeur),
            poidsEntree: dto.poidsEntree !== undefined ? Number(dto.poidsEntree) : null,
            poidsSortie: dto.poidsSortie !== undefined ? Number(dto.poidsSortie) : null,
            prixUnitaire: dto.prixUnitaire !== undefined ? Number(dto.prixUnitaire) : null,
            status: dto.status || 'EN_COURS',
            attachments: this.mapFiles(files),
        });
        this.recalculate(newOp);
        return await newOp.save();
    }
    async enregistrerSortie(id, dto) {
        const operation = await this.fitouraModel.findById(id);
        if (!operation)
            throw new common_1.NotFoundException('Opération non trouvée');
        if (dto.poidsSortie !== undefined) {
            operation.poidsSortie = Number(dto.poidsSortie);
        }
        this.recalculate(operation);
        return await operation.save();
    }
    async modifierFitouraManuellement(id, dto) {
        const operation = await this.fitouraModel.findById(id);
        if (!operation)
            throw new common_1.NotFoundException('Fitoura non trouvée');
        if (dto.matriculeCamion !== undefined) {
            operation.matriculeCamion = this.normalizeString(dto.matriculeCamion);
        }
        if (dto.chauffeur !== undefined) {
            operation.chauffeur = this.normalizeString(dto.chauffeur);
        }
        if (dto.poidsEntree !== undefined) {
            operation.poidsEntree = Number(dto.poidsEntree);
        }
        if (dto.poidsSortie !== undefined) {
            operation.poidsSortie = Number(dto.poidsSortie);
        }
        if (dto.prixUnitaire !== undefined) {
            operation.prixUnitaire = Number(dto.prixUnitaire);
        }
        if (dto.status !== undefined) {
            operation.status = dto.status;
        }
        this.recalculate(operation);
        return await operation.save();
    }
    async addAttachments(id, files = []) {
        const operation = await this.fitouraModel.findById(id);
        if (!operation)
            throw new common_1.NotFoundException('Fitoura non trouvée');
        const newAttachments = this.mapFiles(files);
        operation.attachments = [...(operation.attachments || []), ...newAttachments];
        return await operation.save();
    }
    async removeAttachment(id, attachmentId) {
        const operation = await this.fitouraModel.findById(id);
        if (!operation)
            throw new common_1.NotFoundException('Fitoura non trouvée');
        const attachment = (operation.attachments || []).find((item) => String(item._id) === attachmentId);
        if (!attachment) {
            throw new common_1.NotFoundException('Pièce jointe non trouvée');
        }
        if (attachment.path && fs.existsSync(attachment.path)) {
            fs.unlinkSync(attachment.path);
        }
        operation.attachments = (operation.attachments || []).filter((item) => String(item._id) !== attachmentId);
        return await operation.save();
    }
    async searchCamions(search = '') {
        const query = {
            matriculeCamion: {
                $exists: true,
                $nin: [null, ''],
            },
        };
        if (search.trim()) {
            query.matriculeCamion = {
                $regex: new RegExp(search.trim(), 'i'),
                $nin: [null, ''],
            };
        }
        const results = await this.fitouraModel.distinct('matriculeCamion', query);
        return results.sort((a, b) => String(a).localeCompare(String(b), 'fr'));
    }
    async searchChauffeurs(search = '') {
        const query = {
            chauffeur: {
                $exists: true,
                $nin: [null, ''],
            },
        };
        if (search.trim()) {
            query.chauffeur = {
                $regex: new RegExp(search.trim(), 'i'),
                $nin: [null, ''],
            };
        }
        const results = await this.fitouraModel.distinct('chauffeur', query);
        return results.sort((a, b) => String(a).localeCompare(String(b), 'fr'));
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
        const op = await this.fitouraModel.findById(id);
        if (!op)
            return;
        for (const attachment of op.attachments || []) {
            if (attachment.path && fs.existsSync(attachment.path)) {
                fs.unlinkSync(attachment.path);
            }
        }
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