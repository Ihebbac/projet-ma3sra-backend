import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AchatBaseDocument = AchatBase & Document;

@Schema({ timestamps: true })
export class AchatBase {
  @Prop({ required: true })
  dateAchat: string;

  @Prop({ required: true })
  nomPrenom: string;

  @Prop()
  numTel?: string;

  @Prop({ required: true })
  nbreCaisse: number;

  @Prop({ required: true })
  poidWiba: number;

  @Prop({ required: true })
  quantiteOliveBrute: number;

  @Prop({ required: true })
  prixBase: number;

  @Prop({ required: true })
  quantiteOliveNet: number;

  @Prop({ required: true })
  quantiteHuileNet: number;

  @Prop({ required: true })
  nisba: number;

  @Prop({ required: true })
  ktou3: number;

  @Prop({ required: true })
  coutAchatClient: number;

  @Prop({ required: true })
  fraisTransformation: number;

  @Prop({ required: true })
  prixTotalVenteHuile: number;

  @Prop()
  poidsHuileNetReel?: number;

  @Prop()
  nombreQfza?: number;

  @Prop({ default: false })
  isPaid: boolean;
}

export const AchatBaseSchema = SchemaFactory.createForClass(AchatBase);