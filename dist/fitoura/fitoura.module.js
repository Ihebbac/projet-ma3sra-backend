"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FitouraModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const fitoura_schema_1 = require("../schema/fitoura.schema");
const fitoura_service_1 = require("./fitoura.service");
const fitoura_controller_1 = require("./fitoura.controller");
let FitouraModule = class FitouraModule {
};
exports.FitouraModule = FitouraModule;
exports.FitouraModule = FitouraModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: fitoura_schema_1.Fitoura.name, schema: fitoura_schema_1.FitouraSchema }])],
        providers: [fitoura_service_1.FitouraService],
        controllers: [fitoura_controller_1.FitouraController],
    })
], FitouraModule);
//# sourceMappingURL=fitoura.module.js.map