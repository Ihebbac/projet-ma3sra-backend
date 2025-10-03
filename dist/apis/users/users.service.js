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
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        const hash = await bcrypt.hash(createUserDto.password, 10);
        const newUser = new this.userModel({ ...createUserDto, password: hash });
        return newUser.save();
    }
    async findAll() {
        const usersData = await this.userModel.find().select('-password').populate('role');
        if (!usersData || usersData.length == 0) {
            throw new common_1.NotFoundException('User data not found! collection is empty');
        }
        return usersData;
    }
    async findOne(id) {
        const userData = await this.userModel.findById(id);
        if (!userData) {
            throw new Error('User not Found!');
        }
        return userData;
    }
    async update(id, updateUserDto) {
        const existingUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
        if (!existingUser) {
            throw new common_1.NotFoundException(`User #${id} not found`);
        }
        return existingUser;
    }
    async remove(id) {
        const deletedUser = await this.userModel.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new common_1.NotFoundException(`User #${id} not found`);
        }
        return `User #${id} deleted`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map