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
export declare class Client {
    nomPrenom: string;
    numTelephone: number;
    type: string;
    dateCreation: Date;
    nombreCaisses: number;
    quantiteOlive: number;
    quantiteOliveNet: number;
    quantiteHuile: number;
    kattou3: number;
    nisba: number;
    nisbaReelle?: number;
    quantiteHuileTheorique?: number;
    differenceHuile?: number;
    nombreWiba?: number;
    nombreQfza?: number;
    huileParQfza?: number;
    prixFinal?: number;
    prixKg?: number;
    status: 'payé' | 'non payé';
    nomutilisatuer?: string;
    commentaire?: string;
}
export declare const ClientSchema: import("mongoose").Schema<Client, import("mongoose").Model<Client, any, any, any, Document<unknown, any, Client> & Client & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Client, Document<unknown, {}, import("mongoose").FlatRecord<Client>> & import("mongoose").FlatRecord<Client> & {
    _id: import("mongoose").Types.ObjectId;
}>;
