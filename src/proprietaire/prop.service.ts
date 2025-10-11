import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProprietaireDto } from './dto/create-prop.dto';
import { UpdateProprietaireDto } from './dto/update-prop.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proprietaire } from '../schema/prop.schema';
import { IProprietaire } from 'src/interfaces/proprietaire.interface';

@Injectable()
export class ProprietairesService {
  constructor(
    @InjectModel(Proprietaire.name) private proprietaireModel: Model<IProprietaire>,
  ) {}

  async create(createProprietaireDto: CreateProprietaireDto): Promise<any> {
    try {
      const newProprietaire = new this.proprietaireModel(createProprietaireDto);
      return await newProprietaire.save();
    } catch (error) {
      throw new HttpException(
        'Error creating proprietaire: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<any[]> {
    const proprietairesData = await this.proprietaireModel.find().exec();
    if (!proprietairesData || proprietairesData.length === 0) {
      throw new NotFoundException('No proprietaires found in the collection.');
    }
    return proprietairesData;
  }

  async findOne(id: string): Promise<any> {
    const proprietaireData = await this.proprietaireModel.findById(id).exec();
    if (!proprietaireData) {
      throw new NotFoundException(`Proprietaire with ID ${id} not found.`);
    }
    return proprietaireData;
  }

  async update(id: string, updateProprietaireDto: UpdateProprietaireDto): Promise<any> {
    const updatedProprietaire = await this.proprietaireModel.findByIdAndUpdate(
      id,
      updateProprietaireDto,
      { new: true },
    );
    if (!updatedProprietaire) {
      throw new NotFoundException(`Proprietaire with ID ${id} not found for update.`);
    }
    return updatedProprietaire;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deletedProprietaire = await this.proprietaireModel.findByIdAndDelete(id).exec();
    if (!deletedProprietaire) {
      throw new NotFoundException(`Proprietaire with ID ${id} not found for deletion.`);
    }
    return { message: `Proprietaire with ID ${id} deleted successfully.` };
  }

  // 🆕 ✅ Nouvelle méthode : mise à jour du stock (huile/olive) avec historique
  async updateStock(
    id: string,
    type: 'huile' | 'olive',
    quantite: number,
    operation: 'ajout' | 'retrait',
  ): Promise<any> {
    const proprietaire = await this.proprietaireModel.findById(id).exec();
    if (!proprietaire) {
      throw new NotFoundException(`Proprietaire with ID ${id} not found for stock update.`);
    }

    // ✅ Mise à jour du stock selon le type et l’opération
    if (type === 'huile') {
      proprietaire.quantiteHuile =
        operation === 'ajout'
          ? proprietaire.quantiteHuile + quantite
          : Math.max(0, proprietaire.quantiteHuile - quantite);
    } else if (type === 'olive') {
      proprietaire.quantiteOlive =
        operation === 'ajout'
          ? proprietaire.quantiteOlive + quantite
          : Math.max(0, proprietaire.quantiteOlive - quantite);
    }

    // ✅ Ajout d’un petit historique dans un champ transactions (auto-créé s’il n’existe pas)
    if (!Array.isArray((proprietaire as any).transactions)) {
      (proprietaire as any).transactions = [];
    }

    (proprietaire as any).transactions.push({
      date: new Date(),
      type,
      quantite,
      operation,
    });

    await proprietaire.save();
    return proprietaire;
  }
}
