import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Caisse {
  @Prop({ required: true })
  motif: string;

  @Prop({ required: true })
  montant: number;

  @Prop({ required: true })
  type: string;
  @Prop({ required: false })
  uniqueId: string;

  @Prop({ required: true })
  date: string;
  @Prop({ required: false })
  commentaire: string;
}

export const CaisseSchema = SchemaFactory.createForClass(Caisse);
