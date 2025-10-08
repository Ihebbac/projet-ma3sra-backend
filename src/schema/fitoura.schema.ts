import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Fitoura extends Document {
  @Prop({ required: true })
  matriculeCamion: string;

  @Prop({ required: true })
  chauffeur: string;

  @Prop({ type: Number, required: true })
  poidsEntree: number;

  @Prop({ type: Number })
  poidsSortie?: number;

  @Prop({ type: Number })
  poidsNet?: number;

  @Prop({ type: Number, required: true })
  prixUnitaire: number;

  @Prop({ type: Number })
  montantTotal?: number;

  @Prop({ type: String, enum: ['EN_COURS', 'TERMINE'], default: 'EN_COURS' })
  status: string;

  @Prop()
  dateSortie?: Date;
}

export const FitouraSchema = SchemaFactory.createForClass(Fitoura);
