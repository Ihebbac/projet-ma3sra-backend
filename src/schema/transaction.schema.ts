import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true, default: Date.now })
  date: Date;

  @Prop({ default: Date.now })
  dateCreation?: Date;

  @Prop({ required: true, enum: ['olive', 'huile'] })
  typeStock: 'olive' | 'huile';

  @Prop({ enum: ['olive', 'huile'] })
  type?: 'olive' | 'huile';

  @Prop({ required: true })
  quantite: number;

  @Prop({ required: true, default: 0 })
  prix: number;

  @Prop({ default: 0 })
  prixFinal?: number;

  @Prop({ required: true })
  motif: string;

  @Prop({ default: '' })
  details?: string;

  @Prop({ default: '' })
  commentaire?: string;

  @Prop({ required: true })
  proprietaireId: string;

  @Prop({ default: '' })
  clientNom?: string;

  @Prop({ default: '' })
  nomPrenom?: string;

  @Prop({ enum: ['ajout', 'retrait'], default: 'retrait' })
  operation?: 'ajout' | 'retrait';

  @Prop({ default: null })
  clientId?: string | null;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
export type TransactionDocument = Transaction & Document;