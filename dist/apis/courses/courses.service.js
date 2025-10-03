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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let CoursesService = class CoursesService {
    constructor(courseModel) {
        this.courseModel = courseModel;
    }
    create(createCourseDto) {
        const newCourse = new this.courseModel(createCourseDto);
        return newCourse.save();
    }
    async findAll() {
        const coursesData = await this.courseModel.find();
        if (!coursesData || coursesData.length == 0) {
            throw new common_1.NotFoundException('Course data not found! collection is empty');
        }
        return coursesData;
    }
    findOne(id) {
        const courseData = this.courseModel.findById(id);
        if (!courseData) {
            throw new common_1.NotFoundException('Course data not found!');
        }
        return courseData;
    }
    async update(id, updateCourseDto) {
        const existingCourse = await this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true });
        if (!existingCourse) {
            throw new common_1.NotFoundException(`Course #${id} not found`);
        }
        return existingCourse;
    }
    async remove(id) {
        const deletedCourse = await this.courseModel.findByIdAndDelete(id);
        if (!deletedCourse) {
            throw new common_1.NotFoundException(`Course #${id} not found`);
        }
        return `Course #${id} deleted`;
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Course')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CoursesService);
//# sourceMappingURL=courses.service.js.map