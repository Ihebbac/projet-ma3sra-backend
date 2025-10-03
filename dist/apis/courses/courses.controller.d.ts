import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(createCourseDto: CreateCourseDto): Promise<import("../../shared/interfaces/course.interface").ICourse>;
    findAll(): Promise<import("../../shared/interfaces/course.interface").ICourse[]>;
    findOne(id: string): Promise<import("../../shared/interfaces/course.interface").ICourse>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<import("../../shared/interfaces/course.interface").ICourse>;
    remove(id: string): Promise<string>;
}
