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
import { CreateProprietaireDto } from './dto/create-prop.dto';
import { UpdateProprietaireDto } from './dto/update-prop.dto';
import { Model } from 'mongoose';
import { IProprietaire } from 'src/interfaces/proprietaire.interface';
export declare class ProprietairesService {
    private proprietaireModel;
    constructor(proprietaireModel: Model<IProprietaire>);
    create(createProprietaireDto: CreateProprietaireDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateProprietaireDto: UpdateProprietaireDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
    updateStock(id: string, type: 'huile' | 'olive', quantite: number, operation: 'ajout' | 'retrait'): Promise<any>;
}
