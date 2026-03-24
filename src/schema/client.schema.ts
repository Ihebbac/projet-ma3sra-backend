import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Client {
  @Prop({ required: true })
  nomPrenom: string;

  @Prop({ required: true })
  numTelephone: number;

  @Prop({ required: true })
  type: string;

  @Prop()
  dateCreation: Date;

  @Prop()
  nombreCaisses: number;

  @Prop()
  quantiteOlive: number;

  @Prop()
  quantiteOliveNet: number;

  @Prop()
  quantiteHuile: number;

  @Prop()
  kattou3: number;

  @Prop()
  nisba: number;

  @Prop()
  nisbaReelle?: number;

  @Prop()
  quantiteHuileTheorique?: number;

  @Prop()
  differenceHuile?: number;

  @Prop()
  nombreWiba?: number;

  @Prop()
  nombreQfza?: number;

  @Prop()
  huileParQfza?: number;

  @Prop()
  prixFinal?: number;

  @Prop()
  prixKg?: number;

  @Prop({ enum: ['payé', 'non payé'], default: 'non payé' })
  status: 'payé' | 'non payé';

  @Prop()
  nomutilisatuer?: string;

  @Prop()
  commentaire?: string;

  @Prop({ unique: true, sparse: true })
  publicTrackingToken?: string;

  @Prop({ default: true })
  trackingEnabled?: boolean;
}

export const ClientSchema = SchemaFactory.createForClass(Client);