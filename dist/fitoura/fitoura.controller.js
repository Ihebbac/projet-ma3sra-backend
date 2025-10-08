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
exports.FitouraController = void 0;
const common_1 = require("@nestjs/common");
const fitoura_service_1 = require("./fitoura.service");
const create_fitoura_dto_1 = require("./dto/create-fitoura.dto");
const update_fitoura_dto_1 = require("./dto/update-fitoura.dto");
let FitouraController = class FitouraController {
    constructor(fitouraService) {
        this.fitouraService = fitouraService;
    }
    createEntree(dto) {
        return this.fitouraService.enregistrerEntree(dto);
    }
    updateSortie(id, dto) {
        return this.fitouraService.enregistrerSortie(id, dto);
    }
    findAll() {
        return this.fitouraService.findAll();
    }
    findOne(id) {
        return this.fitouraService.findOne(id);
    }
    delete(id) {
        return this.fitouraService.delete(id);
    }
};
exports.FitouraController = FitouraController;
__decorate([
    (0, common_1.Post)('entree'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_fitoura_dto_1.CreateFitouraDto]),
    __metadata("design:returntype", void 0)
], FitouraController.prototype, "createEntree", null);
__decorate([
    (0, common_1.Put)('sortie/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_fitoura_dto_1.UpdateFitouraDto]),
    __metadata("design:returntype", void 0)
], FitouraController.prototype, "updateSortie", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FitouraController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FitouraController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FitouraController.prototype, "delete", null);
exports.FitouraController = FitouraController = __decorate([
    (0, common_1.Controller)('fitoura'),
    __metadata("design:paramtypes", [fitoura_service_1.FitouraService])
], FitouraController);
//# sourceMappingURL=fitoura.controller.js.map