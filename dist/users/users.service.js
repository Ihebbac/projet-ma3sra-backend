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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const user_schema_1 = require("../schema/user.schema");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
        this.sanitizeLean = (u) => ({
            id: u._id?.toString?.() ?? u._id,
            name: u.name,
            email: u.email,
            phone: u.phone,
            roles: u.roles,
            createdAt: u.createdAt,
            updatedAt: u.updatedAt,
        });
    }
    async create(dto) {
        const exists = await this.userModel.exists({
            email: dto.email.toLowerCase(),
        });
        if (exists)
            throw new common_1.ConflictException('Email déjà utilisé');
        const passwordHash = await bcrypt.hash(dto.password, 12);
        const doc = await this.userModel.create({
            name: dto.name,
            email: dto.email.toLowerCase(),
            phone: dto.phone,
            roles: dto.roles?.length ? dto.roles : ['user'],
            passwordHash,
        });
        return this.sanitize(doc);
    }
    async findAll() {
        const users = await this.userModel.find().lean();
        return users.map(this.sanitizeLean);
    }
    async findOne(id) {
        const user = await this.userModel.findById(id);
        if (!user)
            throw new common_1.NotFoundException('Utilisateur introuvable');
        return this.sanitize(user);
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email: email.toLowerCase() });
    }
    async update(id, dto) {
        throw new Error('Not implemented');
    }
    async remove(id) {
        throw new Error('Not implemented');
    }
    sanitize(u) {
        return {
            id: u._id.toString(),
            name: u.name,
            email: u.email,
            phone: u.phone,
            roles: u.roles,
            createdAt: u.createdAt,
            updatedAt: u.updatedAt,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map