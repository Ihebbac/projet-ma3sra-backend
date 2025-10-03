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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let RoleService = class RoleService {
    constructor(roleModel) {
        this.roleModel = roleModel;
    }
    async create(CreateRoleDto) {
        const data = await this.roleModel.findById(CreateRoleDto.name);
        if (data) {
            throw new common_1.BadRequestException('Role already exists!');
        }
        else {
            const newData = new this.roleModel(CreateRoleDto);
            return newData.save();
        }
    }
    async findAll() {
        const allData = await this.roleModel.find();
        if (!allData || allData.length == 0) {
            throw new common_1.NotFoundException('Role data not found! collection is empty');
        }
        return allData;
    }
    async findOne(id) {
        const data = await this.roleModel.findById(id);
        if (!data) {
            throw new Error('Role not Found!');
        }
        return data;
    }
    async update(id, UpdateRoleDto) {
        const data = await this.roleModel.findByIdAndUpdate(id, UpdateRoleDto, { new: true });
        if (!data) {
            throw new common_1.NotFoundException(`Role #${id} not found`);
        }
        return data;
    }
    async remove(id) {
        const data = await this.roleModel.findByIdAndDelete(id);
        if (!data) {
            throw new common_1.NotFoundException(`Role #${id} not found`);
        }
        return `Role #${id} deleted`;
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Role')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RoleService);
//# sourceMappingURL=role.service.js.map