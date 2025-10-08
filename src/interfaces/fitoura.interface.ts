import { Document } from 'mongoose';

export interface FitouraInterface extends Document {
   matriculeCamion: string;
   chauffeur: string;
   poidsEntree: number;
   poidsSortie?: number;
   poidsNet?: number;
   prixUnitaire: number;
   montantTotal?: number;
   status?: 'EN_COURS' | 'TERMINE';
   createdAt?: Date;
   updatedAt?: Date;
   dateSortie?: Date;
}
