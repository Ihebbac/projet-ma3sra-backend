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
import { FitouraInterface } from '../interfaces/fitoura.interface';
import { CreateFitouraDto } from './dto/create-fitoura.dto';
import { UpdateFitouraDto } from './dto/update-fitoura.dto';
import { UpdateFitouraManuelleDto } from './dto/update-fitoura-manuelle.dto.ts';
export declare class FitouraService {
    private readonly fitouraModel;
    constructor(fitouraModel: Model<FitouraInterface>);
    enregistrerEntree(dto: CreateFitouraDto): Promise<FitouraInterface>;
    enregistrerSortie(id: string, dto: UpdateFitouraDto): Promise<FitouraInterface>;
    modifierFitouraManuellement(id: string, dto: UpdateFitouraManuelleDto): Promise<FitouraInterface>;
    findAll(): Promise<FitouraInterface[]>;
    findOne(id: string): Promise<FitouraInterface>;
    delete(id: string): Promise<void>;
}
