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
import { Document } from 'mongoose';
export type AbsenceType = 'ABSENT' | 'CONGE_NON_PAYE';
export type AvanceMode = 'CAISSE' | 'NOTE';
export declare class Employe extends Document {
    nom: string;
    prenom: string;
    numTel: string;
    poste: string;
    statut: string;
    estActif: boolean;
    montantJournalier: number;
    montantHeure: number;
    joursSemaineTravail: number[];
    dateDebutPresence?: string;
    dateFinPresence?: string;
    absences: {
        date: string;
        type?: AbsenceType;
        motif?: string;
    }[];
    avances: {
        date: string;
        montant: number;
        mode: AvanceMode;
        note?: string;
    }[];
    joursPayes: any[];
    joursTravailles: any[];
}
export declare const EmployeSchema: import("mongoose").Schema<Employe, import("mongoose").Model<Employe, any, any, any, Document<unknown, any, Employe> & Employe & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Employe, Document<unknown, {}, import("mongoose").FlatRecord<Employe>> & import("mongoose").FlatRecord<Employe> & Required<{
    _id: unknown;
}>>;
