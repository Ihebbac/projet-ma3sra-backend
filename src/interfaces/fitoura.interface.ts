import { Document } from 'mongoose';

export interface FitouraAttachmentInterface {
  _id?: string;
  originalName: string;
  filename: string;
  path: string;
  mimetype: string;
  size: number;
  uploadedAt: Date;
}

export interface FitouraInterface extends Document {
  matriculeCamion?: string | null;
  chauffeur?: string | null;
  poidsEntree?: number | null;
  poidsSortie?: number | null;
  poidsNet?: number | null;
  prixUnitaire?: number | null;
  montantTotal?: number | null;
  status: 'EN_COURS' | 'TERMINE';
  dateSortie?: Date | null;
  attachments: FitouraAttachmentInterface[];
  createdAt?: Date;
  updatedAt?: Date;
}
export type FitouraStatus = 'EN_COURS' | 'TERMINE';