import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Transaction {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, enum: ['olive', 'huile'] })
  typeStock: string;

  @Prop({ required: true })
  quantite: number;

  @Prop({ required: true })
  clientNom: string;

  @Prop({ required: true })
  motif: string;

  @Prop({ default: '' })
  details: string;

  @Prop({ required: true })
  proprietaireId: string;

  @Prop({ required: true })
  clientId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
export type TransactionDocument = Transaction & Document;