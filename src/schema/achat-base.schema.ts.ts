import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AchatBaseDocument = HydratedDocument<AchatBase>;

@Schema({ timestamps: true })
export class AchatBase {
    @Prop({ required: true, type: String })
    dateAchat: string;

    @Prop({ required: true, type: String })
    nomPrenom: string;

    @Prop({ required: false, type: String })
    numTel?: string;

    @Prop({ required: true, type: Number })
    nbreCaisse: number;

    @Prop({ required: true, type: Number })
    poidWiba: number;
    
    @Prop({ required: true, type: Number })
    quantiteOliveBrute: number;

    @Prop({ required: true, type: Number })
    prixBase: number; // Prix d'achat de l'huile (Dinar)

    // Champs CALCULÉS, nécessaires pour la transaction et l'historique
    
    @Prop({ required: true, type: Number })
    quantiteOliveNet: number; // Olive Brute - Poids Caisses

    @Prop({ required: true, type: Number })
    quantiteHuileNet: number; // Huile réelle produite = (Olive Net / Poid Wiba)

    @Prop({ required: true, type: Number })
    nisba: number; // Rendement : Huile Net / Olive Net

    @Prop({ required: true, type: Number })
    ktou3: number; // Facteur de conversion : (Huile Net / 9.09) / (Olive Net / 432)

    @Prop({ required: true, type: Number })
    coutAchatClient: number; // Huile Net * Prix Base (Ce qui est payé au client)
    
    @Prop({ required: true, type: Number })
    fraisTransformation: number; // Différence affichée pour la transparence (exemple)

    @Prop({ required: true, type: Number })
    prixTotalVenteHuile: number; // Huile Net * Prix Base (avec frais)
}

export const AchatBaseSchema = SchemaFactory.createForClass(AchatBase);