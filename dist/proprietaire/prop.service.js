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
exports.ProprietairesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const prop_schema_1 = require("../schema/prop.schema");
let ProprietairesService = class ProprietairesService {
    constructor(proprietaireModel) {
        this.proprietaireModel = proprietaireModel;
    }
    async create(createProprietaireDto) {
        try {
            const newProprietaire = new this.proprietaireModel(createProprietaireDto);
            return await newProprietaire.save();
        }
        catch (error) {
            throw new common_1.HttpException('Error creating proprietaire: ' + error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        const proprietairesData = await this.proprietaireModel.find().exec();
        if (!proprietairesData || proprietairesData.length === 0) {
            throw new common_1.NotFoundException('No proprietaires found in the collection.');
        }
        return proprietairesData;
    }
    async findOne(id) {
        const proprietaireData = await this.proprietaireModel.findById(id).exec();
        if (!proprietaireData) {
            throw new common_1.NotFoundException(`Proprietaire with ID ${id} not found.`);
        }
        return proprietaireData;
    }
    async update(id, updateProprietaireDto) {
        const updatedProprietaire = await this.proprietaireModel.findByIdAndUpdate(id, updateProprietaireDto, { new: true });
        if (!updatedProprietaire) {
            throw new common_1.NotFoundException(`Proprietaire with ID ${id} not found for update.`);
        }
        return updatedProprietaire;
    }
    async remove(id) {
        const deletedProprietaire = await this.proprietaireModel.findByIdAndDelete(id).exec();
        if (!deletedProprietaire) {
            throw new common_1.NotFoundException(`Proprietaire with ID ${id} not found for deletion.`);
        }
        return { message: `Proprietaire with ID ${id} deleted successfully.` };
    }
};
exports.ProprietairesService = ProprietairesService;
exports.ProprietairesService = ProprietairesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(prop_schema_1.Proprietaire.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProprietairesService);
//# sourceMappingURL=prop.service.js.map