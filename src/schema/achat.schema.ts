import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AchatDocument = HydratedDocument<Achat>;

@Schema({ timestamps: true })
export class Achat {
    @Prop({ required: true, type: String })
    dateAchat: string; // YYYY-MM-DD

    @Prop({ required: true, type: Number })
    quantiteOlive: number; // Poids brut (kg)

    @Prop({ required: true, type: Number })
    nbreCaisse: number; // Nombre de caisses

    @Prop({ required: true, type: Number })
    poidWiba: number; // Poids Wiba unitaire (kg)

    @Prop({ required: true, type: Number })
    prixWiba: number; // Prix Wiba (Dinar)

    // Champs calculés, stockés pour l'historique et l'affichage rapide

    @Prop({ required: true, type: Number })
    quantiteOliveNet: number; // quantiteOlive - (nbreCaisse * POID_CAISSE)

    @Prop({ required: true, type: Number })
    produitWiba: number; // Huile estimée (Wiba)

    @Prop({ required: true, type: Number })
    coutTotal: number; // Coût final
}

export const AchatSchema = SchemaFactory.createForClass(Achat);