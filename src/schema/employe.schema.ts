import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Employe extends Document {
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  prenom: string;

  @Prop({ required: true })
  numTel: string;

  @Prop({ required: true })
  poste: string;
 
  @Prop({ type: [String], default: [] })
  joursPayes: string[];
  @Prop({ required: true })
  montantJournalier: number;

  @Prop({ type: [Date], default: [] })
  joursTravailles: Date[];
}

export const EmployeSchema = SchemaFactory.createForClass(Employe);
