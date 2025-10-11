import { Document } from 'mongoose';

export interface ITransaction extends Document {
  date: Date;
  typeStock: 'olive' | 'huile';
  quantite: number;
  clientNom: string;
  motif: string;
  details: string;
  proprietaireId: string;
  clientId: string;
  createdAt: Date;
  updatedAt: Date;
}