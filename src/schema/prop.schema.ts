import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

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

  @Prop({ default: 0 })
  nisba: number; 
}

export const ProprietaireSchema = SchemaFactory.createForClass(Proprietaire);
export type ProprietaireDocument = Proprietaire & Document;