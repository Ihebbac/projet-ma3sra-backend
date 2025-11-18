import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Achat } from '../schema/achat.schema';
import { CreateAchatDto, TotalsDto } from './dto/achat.dto';

// Constante pour le poids d'une caisse (identique au frontend)
const POID_CAISSE = 30;

@Injectable()
export class AchatService {
    constructor(@InjectModel(Achat.name) private achatModel: Model<Achat>) {}

    // Fonction de calcul réutilisable
    private calculateAchatMetrics(dto: CreateAchatDto): { quantiteOliveNet: number, produitWiba: number, coutTotal: number } {
        const { quantiteOlive, nbreCaisse, poidWiba, prixWiba } = dto;
        
        const poidsCaisseTotal = nbreCaisse * POID_CAISSE;
        const quantiteOliveNet = Math.max(0, quantiteOlive - poidsCaisseTotal);

        if (quantiteOliveNet === 0) {
             // Ceci peut être une erreur si la quantité brute est trop petite
             // On peut tolérer un Net de 0 ou lever une exception selon la règle métier
             return { quantiteOliveNet: 0, produitWiba: 0, coutTotal: 0 };
        }
        
        if (poidWiba <= 0) {
            throw new BadRequestException("Le Poids Wiba doit être supérieur à zéro pour le calcul.");
        }

        const calculProduit = quantiteOliveNet / poidWiba;
        const produitWiba = Math.round(calculProduit * 100) / 100; // Arrondi à 2 décimales

        const coutTotal = Math.round((produitWiba * prixWiba) * 100) / 100; // Arrondi à 2 décimales

        return { quantiteOliveNet, produitWiba, coutTotal };
    }

    // Création d'un nouvel achat
    async create(createAchatDto: CreateAchatDto): Promise<Achat> {
        const calculatedMetrics = this.calculateAchatMetrics(createAchatDto);
        
        const createdAchat = new this.achatModel({
            ...createAchatDto,
            ...calculatedMetrics,
        });
        return createdAchat.save();
    }

    // Récupération de tous les achats
    async findAll(): Promise<Achat[]> {
        return this.achatModel.find().sort({ dateAchat: -1, createdAt: -1 }).exec();
    }

    // Récupération d'un seul achat
    async findOne(id: string): Promise<Achat> {
        return this.achatModel.findById(id).exec();
    }

    // Mise à jour d'un achat
    async update(id: string, updateAchatDto: CreateAchatDto): Promise<Achat> {
        const calculatedMetrics = this.calculateAchatMetrics(updateAchatDto);
        
        return this.achatModel.findByIdAndUpdate(
            id,
            { ...updateAchatDto, ...calculatedMetrics },
            { new: true } // Retourne le document mis à jour
        ).exec();
    }

    // Suppression d'un achat
    async delete(id: string): Promise<Achat> {
        return this.achatModel.findByIdAndDelete(id).exec();
    }
    
    // Calcul des totaux cumulés
    async getTotals(): Promise<TotalsDto> {
        const aggregationResult = await this.achatModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalQuantiteOlive: { $sum: '$quantiteOlive' },
                    totalQuantiteOliveNet: { $sum: '$quantiteOliveNet' },
                    totalProduitWiba: { $sum: '$produitWiba' },
                    totalCout: { $sum: '$coutTotal' },
                },
            },
        ]).exec();

        // Si la base est vide
        if (aggregationResult.length === 0) {
            return {
                totalQuantiteOlive: 0,
                totalQuantiteOliveNet: 0,
                totalProduitWiba: 0,
                totalCout: 0,
            };
        }
        
        const totals = aggregationResult[0];

        // Arrondir les totaux avant de les retourner
        return {
            totalQuantiteOlive: Math.round(totals.totalQuantiteOlive * 100) / 100,
            totalQuantiteOliveNet: Math.round(totals.totalQuantiteOliveNet * 100) / 100,
            totalProduitWiba: Math.round(totals.totalProduitWiba * 100) / 100,
            totalCout: Math.round(totals.totalCout * 100) / 100,
        };
    }
}