/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { EmployeService } from './employe.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
export declare class EmployeController {
    private readonly employeService;
    constructor(employeService: EmployeService);
    create(createEmployeDto: CreateEmployeDto): Promise<import("../schema/employe.schema").Employe>;
    findAll(): Promise<import("../schema/employe.schema").Employe[]>;
    findOne(id: string): Promise<import("../schema/employe.schema").Employe>;
    updatePut(id: string, updateEmployeDto: UpdateEmployeDto): Promise<import("../schema/employe.schema").Employe>;
    marquerCommePaye(id: string, date: string): Promise<{
        success: boolean;
        employe: import("mongoose").Document<unknown, {}, import("../schema/employe.schema").Employe> & import("../schema/employe.schema").Employe & Required<{
            _id: unknown;
        }>;
    }>;
    updatePatch(id: string, updateEmployeDto: UpdateEmployeDto): Promise<import("../schema/employe.schema").Employe>;
    remove(id: string): Promise<void>;
    markPresence(id: string): Promise<import("../schema/employe.schema").Employe>;
    calculSalaire(id: string, start?: string, end?: string): Promise<number>;
}
