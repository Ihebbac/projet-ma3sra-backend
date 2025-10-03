import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Client {
  @Prop({ required: true })
  nomPrenom: string;

  @Prop({ required: true, unique: true })
  numCIN: number;

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
  quantiteHuile: number; 

  @Prop()
  kattou3: number; 

  @Prop()
  nisba: number; 
}

export const ClientSchema = SchemaFactory.createForClass(Client);
