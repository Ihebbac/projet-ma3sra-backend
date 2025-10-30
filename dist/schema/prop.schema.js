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
exports.ProprietaireSchema = exports.Proprietaire = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Proprietaire = class Proprietaire {
};
exports.Proprietaire = Proprietaire;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Proprietaire.prototype, "nomPrenom", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Proprietaire.prototype, "dateCreation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Proprietaire.prototype, "nombreCaisses", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Proprietaire.prototype, "quantiteOlive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Proprietaire.prototype, "quantiteHuile", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Proprietaire.prototype, "kattou3", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Proprietaire.prototype, "quantiteOliveNet", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Proprietaire.prototype, "nisbaReelle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Proprietaire.prototype, "quantiteHuileTheorique", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Proprietaire.prototype, "differenceHuile", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Proprietaire.prototype, "nombreWiba", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Proprietaire.prototype, "nombreQfza", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Proprietaire.prototype, "huileParQfza", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Proprietaire.prototype, "nisba", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Proprietaire.prototype, "stockRestant", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                date: { type: Date, default: Date.now },
                type: { type: String, enum: ['huile', 'olive'], required: true },
                quantite: { type: Number, required: true },
                operation: { type: String, enum: ['ajout', 'retrait'], required: true },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], Proprietaire.prototype, "transactions", void 0);
exports.Proprietaire = Proprietaire = __decorate([
    (0, mongoose_1.Schema)()
], Proprietaire);
exports.ProprietaireSchema = mongoose_1.SchemaFactory.createForClass(Proprietaire);
//# sourceMappingURL=prop.schema.js.map