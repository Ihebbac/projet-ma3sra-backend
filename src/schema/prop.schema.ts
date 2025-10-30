import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Proprietaire {
  @Prop({ required: true })
  nomPrenom: string;

  @Prop({ default: Date.now })
  dateCreation: Date;

  @Prop({ default: 0 })
  nombreCaisses: number;

  @Prop({ default: 0 })
  quantiteOlive: number;

  @Prop({ default: 0 })
  quantiteHuile: number;

  @Prop({ default: 0 })
  kattou3: number;
  type: 'proprietaire';

  @Prop({ default: 0 })
  quantiteOliveNet?: number;

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
  nisba: number;

  @Prop({ default: 0 })
  stockRestant: number;

  // ✅ Correction du type des transactions pour correspondre au service
  @Prop({
    type: [
      {
        date: { type: Date, default: Date.now },
        type: { type: String, enum: ['huile', 'olive'], required: true },
        quantite: { type: Number, required: true },
        operation: { type: String, enum: ['ajout', 'retrait'], required: true },
      },
    ],
    default: [],
  })
  transactions: {
    date: Date;
    type: 'huile' | 'olive';
    quantite: number;
    operation: 'ajout' | 'retrait';
  }[];
}

export const ProprietaireSchema = SchemaFactory.createForClass(Proprietaire);
export type ProprietaireDocument = Proprietaire & Document;
