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
import { UpdateEmployeDto } from './dto/update-employe.dto';
export declare class EmployeService {
    private employeModel;
    constructor(employeModel: Model<Employe>);
    create(createEmployeDto: CreateEmployeDto): Promise<Employe>;
    findAll(): Promise<Employe[]>;
    findOne(id: string): Promise<Employe>;
    update(id: string, updateEmployeDto: UpdateEmployeDto): Promise<Employe>;
    remove(id: string): Promise<void>;
    addAbsence(id: string, date: string, motif?: string, type?: 'ABSENT' | 'CONGE_NON_PAYE'): Promise<import("mongoose").Document<unknown, {}, Employe> & Employe & Required<{
        _id: unknown;
    }>>;
    removeAbsence(id: string, date: string): Promise<import("mongoose").Document<unknown, {}, Employe> & Employe & Required<{
        _id: unknown;
    }>>;
    addAdvance(id: string, payload: {
        date: string;
        montant: number;
        mode: 'CAISSE' | 'NOTE';
        note?: string;
    }): Promise<import("mongoose").Document<unknown, {}, Employe> & Employe & Required<{
        _id: unknown;
    }>>;
    resumeMensuel(id: string, month: string): Promise<{
        employeId: unknown;
        nom: string;
        prenom: string;
        poste: string;
        month: string;
        plannedDays: number;
        absences: number;
        workedDays: number;
        base: number;
        brut: number;
        totalAdvances: number;
        net: number;
        window: {
            start: string;
            end: string;
        };
        details?: undefined;
    } | {
        employeId: unknown;
        nom: string;
        prenom: string;
        poste: string;
        month: string;
        plannedDays: number;
        absences: any;
        workedDays: number;
        base: number;
        brut: number;
        totalAdvances: any;
        net: number;
        details: {
            absences: any;
            avances: any;
        };
        window: {
            start: string;
            end: string;
        };
    }>;
    resumeMensuelAll(month: string): Promise<{
        month: string;
        items: ({
            employeId: unknown;
            nom: string;
            prenom: string;
            poste: string;
            month: string;
            plannedDays: number;
            absences: number;
            workedDays: number;
            base: number;
            brut: number;
            totalAdvances: number;
            net: number;
            window: {
                start: string;
                end: string;
            };
            details?: undefined;
        } | {
            employeId: unknown;
            nom: string;
            prenom: string;
            poste: string;
            month: string;
            plannedDays: number;
            absences: any;
            workedDays: number;
            base: number;
            brut: number;
            totalAdvances: any;
            net: number;
            details: {
                absences: any;
                avances: any;
            };
            window: {
                start: string;
                end: string;
            };
        })[];
    }>;
    marquerJourCommePaye(id: string, body: {
        date: string;
        heuresSup?: number;
        mode?: 'CAISSE' | 'NOTE';
        commentaire?: string;
        montant?: number;
    }): Promise<{
        success: boolean;
        employe: import("mongoose").Document<unknown, {}, Employe> & Employe & Required<{
            _id: unknown;
        }>;
    }>;
    markPresence(id: string): Promise<Employe>;
}
