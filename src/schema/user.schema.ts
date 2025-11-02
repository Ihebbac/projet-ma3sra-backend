// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  })
  email: string;

  // ⚠️ on stocke le hash, pas le mot de passe en clair
  @Prop({ required: true })
  passwordHash: string;

  // string est mieux que number pour conserver les 0 en tête
  @Prop({ required: false })
  phone?: string;

  @Prop({ type: [String], default: ['user'] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
