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
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Model } from 'mongoose';
import { Employe } from '../schema/employe.schema';
import { CreateEmployeDto } from './dto/create-employe.dto';
export declare class EmployeService {
    private employeModel;
    constructor(employeModel: Model<Employe>);
    create(createEmployeDto: CreateEmployeDto): Promise<Employe>;
    findAll(): Promise<Employe[]>;
    findOne(id: string): Promise<Employe>;
    update(id: string, updateEmployeDto: any): Promise<any>;
    remove(id: string): Promise<void>;
    marquerJourCommePaye(id: string, date: string): Promise<{
        success: boolean;
        employe: import("mongoose").Document<unknown, {}, Employe> & Employe & Required<{
            _id: unknown;
        }>;
    }>;
    markPresence(id: string): Promise<Employe>;
    calculSalaire(id: string, startDate?: Date, endDate?: Date): Promise<number>;
}
