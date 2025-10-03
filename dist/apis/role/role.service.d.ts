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
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Model } from 'mongoose';
import { IRole } from 'src/shared/interfaces/role.interface';
export declare class RoleService {
    private roleModel;
    constructor(roleModel: Model<IRole>);
    create(CreateRoleDto: CreateRoleDto): Promise<import("mongoose").Document<unknown, {}, IRole> & IRole & Required<{
        _id: unknown;
    }>>;
    findAll(): Promise<IRole[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, IRole> & IRole & Required<{
        _id: unknown;
    }>>;
    update(id: string, UpdateRoleDto: UpdateRoleDto): Promise<IRole>;
    remove(id: string): Promise<string>;
}
