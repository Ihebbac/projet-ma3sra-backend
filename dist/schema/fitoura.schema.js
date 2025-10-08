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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FitouraSchema = exports.Fitoura = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Fitoura = class Fitoura extends mongoose_2.Document {
};
exports.Fitoura = Fitoura;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Fitoura.prototype, "matriculeCamion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Fitoura.prototype, "chauffeur", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Fitoura.prototype, "poidsEntree", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Fitoura.prototype, "poidsSortie", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Fitoura.prototype, "poidsNet", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Fitoura.prototype, "prixUnitaire", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Fitoura.prototype, "montantTotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['EN_COURS', 'TERMINE'], default: 'EN_COURS' }),
    __metadata("design:type", String)
], Fitoura.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Fitoura.prototype, "dateSortie", void 0);
exports.Fitoura = Fitoura = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Fitoura);
exports.FitouraSchema = mongoose_1.SchemaFactory.createForClass(Fitoura);
//# sourceMappingURL=fitoura.schema.js.map