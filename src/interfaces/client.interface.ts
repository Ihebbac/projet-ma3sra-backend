import { Document } from 'mongoose';
export interface IClient extends Document{
    readonly name: string;
    readonly email: string;
    readonly phone: number;
    readonly password: string;
}