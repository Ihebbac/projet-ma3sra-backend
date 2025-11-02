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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from 'src/schema/user.schema';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    create(dto: CreateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string;
        roles: string[];
        createdAt: any;
        updatedAt: any;
    }>;
    findAll(): Promise<{
        id: any;
        name: any;
        email: any;
        phone: any;
        roles: any;
        createdAt: any;
        updatedAt: any;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string;
        roles: string[];
        createdAt: any;
        updatedAt: any;
    }>;
    findByEmail(email: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: number, dto: UpdateUserDto): Promise<void>;
    remove(id: number): Promise<void>;
    sanitize(u: UserDocument): {
        id: string;
        name: string;
        email: string;
        phone: string;
        roles: string[];
        createdAt: any;
        updatedAt: any;
    };
    sanitizeLean: (u: any) => {
        id: any;
        name: any;
        email: any;
        phone: any;
        roles: any;
        createdAt: any;
        updatedAt: any;
    };
}
