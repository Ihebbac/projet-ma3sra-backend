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
    create(dto: CreateEmployeDto): Promise<import("../schema/employe.schema").Employe>;
    payer(id: string, body: {
        date: string;
        heuresSup?: number;
        mode?: 'CAISSE' | 'NOTE';
        commentaire?: string;
        montant?: number;
    }): Promise<{
        success: boolean;
        employe: import("mongoose").Document<unknown, {}, import("../schema/employe.schema").Employe> & import("../schema/employe.schema").Employe & Required<{
            _id: unknown;
        }>;
    }>;
    findAll(): Promise<import("../schema/employe.schema").Employe[]>;
    findOne(id: string): Promise<import("../schema/employe.schema").Employe>;
    update(id: string, dto: UpdateEmployeDto): Promise<import("../schema/employe.schema").Employe>;
    remove(id: string): Promise<void>;
    addAbsence(id: string, body: {
        date: string;
        motif?: string;
        type?: 'ABSENT' | 'CONGE_NON_PAYE';
    }): Promise<import("mongoose").Document<unknown, {}, import("../schema/employe.schema").Employe> & import("../schema/employe.schema").Employe & Required<{
        _id: unknown;
    }>>;
    removeAbsence(id: string, date: string): Promise<import("mongoose").Document<unknown, {}, import("../schema/employe.schema").Employe> & import("../schema/employe.schema").Employe & Required<{
        _id: unknown;
    }>>;
    addAdvance(id: string, body: {
        date: string;
        montant: number;
        mode: 'CAISSE' | 'NOTE';
        note?: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("../schema/employe.schema").Employe> & import("../schema/employe.schema").Employe & Required<{
        _id: unknown;
    }>>;
    resume(id: string, month: string): Promise<{
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
    resumeAll(month: string): Promise<{
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
}
