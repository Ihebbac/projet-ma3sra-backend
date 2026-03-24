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
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { CaisseService } from 'src/caisse/caisse.service';
export declare class ClientsService {
    private clientModel;
    private readonly caisseService;
    constructor(clientModel: Model<any>, caisseService: CaisseService);
    private generatePublicTrackingToken;
    private buildPublicTrackingResponse;
    private ensureTrackingAccessAllowed;
    create(createClientDto: CreateClientDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    findPublicTrackingByToken(token: string): Promise<any>;
    updateStatus(id: string, status: 'payé' | 'non payé'): Promise<any>;
    update(id: string, updateClientDto: UpdateClientDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
