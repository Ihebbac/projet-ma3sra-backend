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
import { Document } from "mongoose";
export declare class Proprietaire {
    nomPrenom: string;
    dateCreation: Date;
    nombreCaisses: number;
    quantiteOlive: number;
    quantiteHuile: number;
    kattou3: number;
    nisba: number;
}
export declare const ProprietaireSchema: import("mongoose").Schema<Proprietaire, import("mongoose").Model<Proprietaire, any, any, any, Document<unknown, any, Proprietaire> & Proprietaire & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Proprietaire, Document<unknown, {}, import("mongoose").FlatRecord<Proprietaire>> & import("mongoose").FlatRecord<Proprietaire> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export type ProprietaireDocument = Proprietaire & Document;
