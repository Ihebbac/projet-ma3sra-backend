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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CategoryService = class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    create(createCategoryDto) {
        const newData = new this.categoryModel(createCategoryDto);
        return newData.save();
    }
    async findAll() {
        const allData = await this.categoryModel.find();
        if (!allData || allData.length == 0) {
            throw new common_1.NotFoundException('ategory data not found! collection is empty');
        }
        return allData;
    }
    async findOne(id) {
        const data = await this.categoryModel.findById(id);
        if (!data) {
            throw new Error('Category not Found!');
        }
        return data;
    }
    async update(id, UpdateCategoryDto) {
        const data = await this.categoryModel.findByIdAndUpdate(id, UpdateCategoryDto, { new: true });
        if (!data) {
            throw new common_1.NotFoundException(`Category #${id} not found`);
        }
        return data;
    }
    async remove(id) {
        const data = await this.categoryModel.findByIdAndDelete(id);
        if (!data) {
            throw new common_1.NotFoundException(`Category #${id} not found`);
        }
        return `Category #${id} deleted`;
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Category')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryService);
//# sourceMappingURL=category.service.js.map