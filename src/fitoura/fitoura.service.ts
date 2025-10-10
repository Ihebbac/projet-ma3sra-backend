import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FitouraInterface } from '../interfaces/fitoura.interface';
import { CreateFitouraDto } from './dto/create-fitoura.dto';
import { UpdateFitouraDto } from './dto/update-fitoura.dto';
import { UpdateFitouraManuelleDto } from './dto/update-fitoura-manuelle.dto.ts';

@Injectable()
export class FitouraService {
  constructor(
    @InjectModel('Fitoura') private readonly fitouraModel: Model<FitouraInterface>,
  ) {}

  // 🚚 Entrée du camion
  async enregistrerEntree(dto: CreateFitouraDto): Promise<FitouraInterface> {
    const newOp = new this.fitouraModel({
      matriculeCamion: dto.matriculeCamion,
      chauffeur: dto.chauffeur,
      poidsEntree: dto.poidsEntree,
      prixUnitaire: dto.prixUnitaire,
      status: 'EN_COURS',
    });
    return await newOp.save();
  }

  // 🚛 Sortie du camion (méthode existante)
  async enregistrerSortie(id: string, dto: UpdateFitouraDto): Promise<FitouraInterface> {
    const operation = await this.fitouraModel.findById(id);
    if (!operation) throw new NotFoundException('Opération non trouvée');

    const poidsNet = dto.poidsSortie - operation.poidsEntree;
    const montantTotal = poidsNet * operation.prixUnitaire;

    operation.poidsSortie = dto.poidsSortie;
    operation.poidsNet = poidsNet;
    operation.montantTotal = montantTotal;
    operation.dateSortie = new Date();
    operation.status = 'TERMINE';

    return operation.save();
  }

  // ✅ Nouvelle méthode pour mise à jour manuelle complète
  async modifierFitouraManuellement(id: string, dto: UpdateFitouraManuelleDto): Promise<FitouraInterface> {
    const operation = await this.fitouraModel.findById(id);
    if (!operation) throw new NotFoundException('Fitoura non trouvée');

    // On met à jour uniquement les champs fournis dans le body
    Object.assign(operation, dto);

    // Si poidsEntree et poidsSortie sont définis, on recalcule automatiquement le net et total
    if (dto.poidsEntree !== undefined && dto.poidsSortie !== undefined && dto.prixUnitaire !== undefined) {
      const poidsNet = dto.poidsSortie - dto.poidsEntree;
      const montantTotal = poidsNet * dto.prixUnitaire;
      operation.poidsNet = poidsNet;
      operation.montantTotal = montantTotal;
    }

    operation.updatedAt = new Date();
    return operation.save();
  }

  async findAll(): Promise<FitouraInterface[]> {
    return this.fitouraModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<FitouraInterface> {
    const op = await this.fitouraModel.findById(id);
    if (!op) throw new NotFoundException('Fitoura non trouvée');
    return op;
  }

  async delete(id: string): Promise<void> {
    await this.fitouraModel.findByIdAndDelete(id);
  }
}
