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

  @Prop({ type: Array, default: [] })
  joursPayes: any;
  @Prop({ required: true })
  montantJournalier: number;
  @Prop({ required: false })
  montantHeure: number;
  @Prop({ type: Array })
  joursTravailles: any;
}

export const EmployeSchema = SchemaFactory.createForClass(Employe);
