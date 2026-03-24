import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: true, timestamps: false })
export class FitouraAttachment {
  @Prop({ required: true })
  originalName: string;

  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  mimetype: string;

  @Prop({ required: true })
  size: number;

  @Prop({ default: Date.now })
  uploadedAt: Date;
}

export const FitouraAttachmentSchema =
  SchemaFactory.createForClass(FitouraAttachment);

@Schema({ timestamps: true })
export class Fitoura extends Document {
  @Prop({ trim: true, default: null })
  matriculeCamion?: string | null;

  @Prop({ trim: true, default: null })
  chauffeur?: string | null;

  @Prop({ type: Number, default: null })
  poidsEntree?: number | null;

  @Prop({ type: Number, default: null })
  poidsSortie?: number | null;

  @Prop({ type: Number, default: null })
  poidsNet?: number | null;

  @Prop({ type: Number, default: null })
  prixUnitaire?: number | null;

  @Prop({ type: Number, default: null })
  montantTotal?: number | null;

  @Prop({
    type: String,
    enum: ['EN_COURS', 'TERMINE'],
    default: 'EN_COURS',
  })
  status: string;

  @Prop({ default: null })
  dateSortie?: Date | null;

  @Prop({
    type: [FitouraAttachmentSchema],
    default: [],
  })
  attachments: FitouraAttachment[];

  createdAt?: Date;
  updatedAt?: Date;
}

export const FitouraSchema = SchemaFactory.createForClass(Fitoura);