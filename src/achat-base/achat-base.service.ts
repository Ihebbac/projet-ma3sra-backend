import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AchatBase } from '../schema/achat-base.schema.ts';
import { CreateAchatBaseDto, TotalsAchatBaseDto } from './dto/achat.dto';

// Constantes pour les calculs (identiques au frontend)
const POID_CAISSE = 30;
const CONSTANTE_HUILE = 9.09; // Constante pour le calcul du Ktou3
const CONSTANTE_OLIVE = 432;  // Constante pour le calcul du Ktou3

@Injectable()
export class AchatBaseService {
    constructor(@InjectModel(AchatBase.name) private achatBaseModel: Model<AchatBase>) {}

    // Fonction de calcul de toutes les métriques
    private calculateAchatBaseMetrics(dto: CreateAchatBaseDto): Omit<AchatBase, keyof CreateAchatBaseDto | '_id' | 'createdAt' | 'updatedAt'> {
        const { quantiteOliveBrute, nbreCaisse, poidWiba, prixBase } = dto;
        
        // 1. Quantité Olive Net
        const poidsCaisseTotal = nbreCaisse * POID_CAISSE;
        const quantiteOliveNet = Math.max(0, quantiteOliveBrute - poidsCaisseTotal);

        if (quantiteOliveNet <= 0 || poidWiba <= 0) {
             throw new BadRequestException("Quantités brutes ou Poids Wiba insuffisants pour un calcul valide.");
        }
        
        // 2. Quantité Huile Net (Produit Huile)
        const quantiteHuileNet = (quantiteOliveNet / poidWiba); // Calcul de base Wiba/Olive
        
        // 3. Nisba (Rendement)
        const nisba = (quantiteHuileNet / quantiteOliveNet); 

        // 4. Ktou3 (Facteur de conversion)
        const ktou3 = (quantiteHuileNet / CONSTANTE_HUILE) / (quantiteOliveNet / CONSTANTE_OLIVE);

        // 5. Coût Achat Client (ce qui est payé)
        const coutAchatClient = quantiteHuileNet * prixBase;

        // 6. Frais et Prix Total (Pour l'exemple de transparence, supposons un frais fixe par kg d'huile)
        // Vous devez définir une règle métier pour les frais
        const FRAIS_TRANSFORMATION_UNITAIRE = 5; // Exemple : 5 Dinar par Kg d'huile
        const fraisTransformation = quantiteHuileNet * FRAIS_TRANSFORMATION_UNITAIRE;
        const prixTotalVenteHuile = coutAchatClient + fraisTransformation;


        // Arrondi de toutes les métriques à 2 décimales
        return {
            quantiteOliveNet: Math.round(quantiteOliveNet * 100) / 100,
            quantiteHuileNet: Math.round(quantiteHuileNet * 100) / 100,
            nisba: Math.round(nisba * 10000) / 10000, // Nisba souvent à 4 décimales pour la précision
            ktou3: Math.round(ktou3 * 10000) / 10000, // Ktou3 souvent à 4 décimales
            coutAchatClient: Math.round(coutAchatClient * 100) / 100,
            fraisTransformation: Math.round(fraisTransformation * 100) / 100,
            prixTotalVenteHuile: Math.round(prixTotalVenteHuile * 100) / 100,
        };
    }

    // CRUD Methods...
    async create(createAchatBaseDto: CreateAchatBaseDto): Promise<AchatBase> {
        const calculatedMetrics = this.calculateAchatBaseMetrics(createAchatBaseDto);
        
        const createdAchat = new this.achatBaseModel({
            ...createAchatBaseDto,
            ...calculatedMetrics,
        });
        return createdAchat.save();
    }

    async findAll(): Promise<AchatBase[]> {
        return this.achatBaseModel.find().sort({ dateAchat: -1, createdAt: -1 }).exec();
    }
    async findOne(id: string): Promise<AchatBase> {
        return this.achatBaseModel.findById(id).exec();
    }
    async update(id: string, updateAchatBaseDto: CreateAchatBaseDto): Promise<AchatBase> {
        const calculatedMetrics = this.calculateAchatBaseMetrics(updateAchatBaseDto);
        
        return this.achatBaseModel.findByIdAndUpdate(
            id,
            { ...updateAchatBaseDto, ...calculatedMetrics },
            { new: true } 
        ).exec();
    }

    async delete(id: string): Promise<AchatBase> {
        return this.achatBaseModel.findByIdAndDelete(id).exec();
    }
    
    // Calcul des totaux cumulés
    async getTotals(): Promise<TotalsAchatBaseDto> {
        const aggregationResult = await this.achatBaseModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalOliveBrute: { $sum: '$quantiteOliveBrute' },
                    totalOliveNet: { $sum: '$quantiteOliveNet' },
                    totalHuileNet: { $sum: '$quantiteHuileNet' },
                    totalCoutAchat: { $sum: '$coutAchatClient' },
                },
            },
        ]).exec();

        if (aggregationResult.length === 0) {
            return {
                totalOliveBrute: 0, totalOliveNet: 0, totalHuileNet: 0, totalCoutAchat: 0,
            };
        }
        
        const totals = aggregationResult[0];

        // Arrondir les totaux
        return {
            totalOliveBrute: Math.round(totals.totalOliveBrute * 100) / 100,
            totalOliveNet: Math.round(totals.totalOliveNet * 100) / 100,
            totalHuileNet: Math.round(totals.totalHuileNet * 100) / 100,
            totalCoutAchat: Math.round(totals.totalCoutAchat * 100) / 100,
        };
    }
}