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
exports.UpdateEmployeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_employe_dto_1 = require("./create-employe.dto");
const class_validator_1 = require("class-validator");
class UpdateEmployeDto extends (0, mapped_types_1.PartialType)(create_employe_dto_1.CreateEmployeDto) {
}
exports.UpdateEmployeDto = UpdateEmployeDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/, { message: 'dateDebutPresence doit être YYYY-MM-DD' }),
    __metadata("design:type", String)
], UpdateEmployeDto.prototype, "dateDebutPresence", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/, { message: 'dateFinPresence doit être YYYY-MM-DD' }),
    __metadata("design:type", String)
], UpdateEmployeDto.prototype, "dateFinPresence", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.Min)(0, { each: true }),
    (0, class_validator_1.Max)(6, { each: true }),
    __metadata("design:type", Array)
], UpdateEmployeDto.prototype, "joursSemaineTravail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateEmployeDto.prototype, "absences", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateEmployeDto.prototype, "avances", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateEmployeDto.prototype, "joursPayes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateEmployeDto.prototype, "joursTravailles", void 0);
//# sourceMappingURL=update-employe.dto.js.map