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
export declare class FitouraAttachment {
    originalName: string;
    filename: string;
    path: string;
    mimetype: string;
    size: number;
    uploadedAt: Date;
}
export declare const FitouraAttachmentSchema: import("mongoose").Schema<FitouraAttachment, import("mongoose").Model<FitouraAttachment, any, any, any, Document<unknown, any, FitouraAttachment> & FitouraAttachment & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FitouraAttachment, Document<unknown, {}, import("mongoose").FlatRecord<FitouraAttachment>> & import("mongoose").FlatRecord<FitouraAttachment> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare class Fitoura extends Document {
    matriculeCamion?: string | null;
    chauffeur?: string | null;
    poidsEntree?: number | null;
    poidsSortie?: number | null;
    poidsNet?: number | null;
    prixUnitaire?: number | null;
    montantTotal?: number | null;
    status: string;
    dateSortie?: Date | null;
    attachments: FitouraAttachment[];
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const FitouraSchema: import("mongoose").Schema<Fitoura, import("mongoose").Model<Fitoura, any, any, any, Document<unknown, any, Fitoura> & Fitoura & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Fitoura, Document<unknown, {}, import("mongoose").FlatRecord<Fitoura>> & import("mongoose").FlatRecord<Fitoura> & Required<{
    _id: unknown;
}>>;
