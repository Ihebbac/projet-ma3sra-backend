import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ClientOperationDocument = HydratedDocument<ClientOperation>;

@Schema({ timestamps: true, collection: 'client_operations' })
export class ClientOperation {
  @Prop({ type: Types.ObjectId, ref: 'Client', required: true, index: true })
  clientId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  nomPrenom: string;

  @Prop({ required: true, trim: true, index: true })
  nomPrenomNormalise: string;

  @Prop({ required: true, index: true })
  numTelephone: number;

  @Prop({ required: true, trim: true })
  type: string;

  @Prop()
  dateCreation: Date;

  @Prop({ default: 0 })
  nombreCaisses: number;

  @Prop({ default: 0 })
  quantiteOlive: number;

  @Prop({ default: 0 })
  quantiteOliveNet: number;

  @Prop({ default: 0 })
  quantiteHuile: number;

  @Prop({ default: 0 })
  kattou3: number;

  @Prop({ default: 0 })
  nisba: number;

  @Prop({ default: 0 })
  nisbaReelle?: number;

  @Prop({ default: 0 })
  quantiteHuileTheorique?: number;

  @Prop({ default: 0 })
  differenceHuile?: number;

  @Prop({ default: 0 })
  nombreWiba?: number;

  @Prop({ default: 0 })
  nombreQfza?: number;

  @Prop({ default: 0 })
  huileParQfza?: number;

  @Prop({ default: 0 })
  prixFinal?: number;

  @Prop({ default: 0 })
  prixKg?: number;

  @Prop({ default: 'non payé', enum: ['payé', 'non payé'] })
  status: 'payé' | 'non payé';

  @Prop()
  nomutilisatuer?: string;

  @Prop()
  commentaire?: string;
}

export const ClientOperationSchema = SchemaFactory.createForClass(ClientOperation);

ClientOperationSchema.index({ clientId: 1, dateCreation: -1 }, { name: 'idx_client_operations_client_date' });