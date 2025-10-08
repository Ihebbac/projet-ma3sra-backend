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
exports.ProprietairesController = void 0;
const common_1 = require("@nestjs/common");
const prop_service_1 = require("./prop.service");
const create_prop_dto_1 = require("./dto/create-prop.dto");
const update_prop_dto_1 = require("./dto/update-prop.dto");
let ProprietairesController = class ProprietairesController {
    constructor(proprietairesService) {
        this.proprietairesService = proprietairesService;
    }
    async create(createProprietaireDto) {
        return this.proprietairesService.create(createProprietaireDto);
    }
    async findAll() {
        return this.proprietairesService.findAll();
    }
    async findOne(id) {
        return this.proprietairesService.findOne(id);
    }
    async update(id, updateProprietaireDto) {
        return this.proprietairesService.update(id, updateProprietaireDto);
    }
    async remove(id) {
        return this.proprietairesService.remove(id);
    }
};
exports.ProprietairesController = ProprietairesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_prop_dto_1.CreateProprietaireDto]),
    __metadata("design:returntype", Promise)
], ProprietairesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProprietairesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProprietairesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_prop_dto_1.UpdateProprietaireDto]),
    __metadata("design:returntype", Promise)
], ProprietairesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProprietairesController.prototype, "remove", null);
exports.ProprietairesController = ProprietairesController = __decorate([
    (0, common_1.Controller)('proprietaires'),
    __metadata("design:paramtypes", [prop_service_1.ProprietairesService])
], ProprietairesController);
//# sourceMappingURL=prop.controller.js.map