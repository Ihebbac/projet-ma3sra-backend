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
exports.EmployeSchema = exports.Employe = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Employe = class Employe extends mongoose_2.Document {
};
exports.Employe = Employe;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Employe.prototype, "nom", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Employe.prototype, "prenom", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Employe.prototype, "numTel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Employe.prototype, "poste", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Employe.prototype, "statut", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Employe.prototype, "estActif", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Employe.prototype, "montantJournalier", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], Employe.prototype, "montantHeure", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Number], default: [0, 1, 2, 3, 4, 5, 6] }),
    __metadata("design:type", Array)
], Employe.prototype, "joursSemaineTravail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", String)
], Employe.prototype, "dateDebutPresence", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", String)
], Employe.prototype, "dateFinPresence", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                date: { type: String, required: true },
                type: { type: String, default: 'ABSENT' },
                motif: { type: String },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], Employe.prototype, "absences", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                date: { type: String, required: true },
                montant: { type: Number, required: true },
                mode: { type: String, default: 'NOTE' },
                note: { type: String },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], Employe.prototype, "avances", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, default: [] }),
    __metadata("design:type", Array)
], Employe.prototype, "joursPayes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, default: [] }),
    __metadata("design:type", Array)
], Employe.prototype, "joursTravailles", void 0);
exports.Employe = Employe = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Employe);
exports.EmployeSchema = mongoose_1.SchemaFactory.createForClass(Employe);
//# sourceMappingURL=employe.schema.js.map