import { Document } from 'mongoose';

export interface IProprietaire extends Document {
  nomPrenom: string;
  dateCreation: Date;
  nombreCaisses: number;
  quantiteOlive: number;
  quantiteHuile: number;
  kattou3: number;
  nisba: number;
}