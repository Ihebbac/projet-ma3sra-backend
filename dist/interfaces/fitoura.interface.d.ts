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
export interface FitouraAttachmentInterface {
    _id?: string;
    originalName: string;
    filename: string;
    path: string;
    mimetype: string;
    size: number;
    uploadedAt: Date;
}
export interface FitouraInterface extends Document {
    matriculeCamion?: string | null;
    chauffeur?: string | null;
    poidsEntree?: number | null;
    poidsSortie?: number | null;
    poidsNet?: number | null;
    prixUnitaire?: number | null;
    montantTotal?: number | null;
    status: 'EN_COURS' | 'TERMINE';
    dateSortie?: Date | null;
    attachments: FitouraAttachmentInterface[];
    createdAt?: Date;
    updatedAt?: Date;
}
export type FitouraStatus = 'EN_COURS' | 'TERMINE';
