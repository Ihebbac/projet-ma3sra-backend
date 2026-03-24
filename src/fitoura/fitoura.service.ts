import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import { FitouraInterface } from '../interfaces/fitoura.interface';
import { CreateFitouraDto } from './dto/create-fitoura.dto';
import { UpdateFitouraDto } from './dto/update-fitoura.dto';
import { UpdateFitouraManuelleDto } from './dto/update-fitoura-manuelle.dto';

@Injectable()
export class FitouraService {
  constructor(
    @InjectModel('Fitoura')
    private readonly fitouraModel: Model<FitouraInterface>,
  ) {}

  private normalizeString(value?: string | null): string | null {
    if (value === undefined || value === null) return null;
    const cleaned = String(value).trim();
    return cleaned.length ? cleaned : null;
  }

  private recalculate(operation: any) {
    const poidsEntree =
      operation.poidsEntree !== null && operation.poidsEntree !== undefined
        ? Number(operation.poidsEntree)
        : null;

    const poidsSortie =
      operation.poidsSortie !== null && operation.poidsSortie !== undefined
        ? Number(operation.poidsSortie)
        : null;

    const prixUnitaire =
      operation.prixUnitaire !== null && operation.prixUnitaire !== undefined
        ? Number(operation.prixUnitaire)
        : null;

    if (poidsEntree !== null && poidsSortie !== null) {
      operation.poidsNet = poidsSortie - poidsEntree;
      operation.dateSortie = operation.dateSortie || new Date();
      operation.status = 'TERMINE';
    } else {
      operation.poidsNet = null;
      if (!operation.status) {
        operation.status = 'EN_COURS';
      }
    }

    if (
      operation.poidsNet !== null &&
      operation.poidsNet !== undefined &&
      prixUnitaire !== null
    ) {
      operation.montantTotal = Number(operation.poidsNet) * prixUnitaire;
    } else {
      operation.montantTotal = null;
    }

    if (poidsSortie === null && operation.status === 'TERMINE') {
      operation.status = 'EN_COURS';
      operation.dateSortie = null;
    }
  }

  private mapFiles(files: Express.Multer.File[] = []) {
    return files.map((file) => ({
      originalName: file.originalname,
      filename: file.filename,
      path: file.path.replace(/\\/g, '/'),
      mimetype: file.mimetype,
      size: file.size,
      uploadedAt: new Date(),
    }));
  }

  async enregistrerEntree(
    dto: CreateFitouraDto,
    files: Express.Multer.File[] = [],
  ): Promise<FitouraInterface> {
    const newOp = new this.fitouraModel({
      matriculeCamion: this.normalizeString(dto.matriculeCamion),
      chauffeur: this.normalizeString(dto.chauffeur),
      poidsEntree:
        dto.poidsEntree !== undefined ? Number(dto.poidsEntree) : null,
      poidsSortie:
        dto.poidsSortie !== undefined ? Number(dto.poidsSortie) : null,
      prixUnitaire:
        dto.prixUnitaire !== undefined ? Number(dto.prixUnitaire) : null,
      status: dto.status || 'EN_COURS',
      attachments: this.mapFiles(files),
    });

    this.recalculate(newOp);

    return await newOp.save();
  }

  async enregistrerSortie(
    id: string,
    dto: UpdateFitouraDto,
  ): Promise<FitouraInterface> {
    const operation = await this.fitouraModel.findById(id);
    if (!operation) throw new NotFoundException('Opération non trouvée');

    if (dto.poidsSortie !== undefined) {
      operation.poidsSortie = Number(dto.poidsSortie);
    }

    this.recalculate(operation);

    return await operation.save();
  }

  async modifierFitouraManuellement(
    id: string,
    dto: UpdateFitouraManuelleDto,
  ): Promise<FitouraInterface> {
    const operation = await this.fitouraModel.findById(id);
    if (!operation) throw new NotFoundException('Fitoura non trouvée');

    if (dto.matriculeCamion !== undefined) {
      operation.matriculeCamion = this.normalizeString(dto.matriculeCamion);
    }

    if (dto.chauffeur !== undefined) {
      operation.chauffeur = this.normalizeString(dto.chauffeur);
    }

    if (dto.poidsEntree !== undefined) {
      operation.poidsEntree = Number(dto.poidsEntree);
    }

    if (dto.poidsSortie !== undefined) {
      operation.poidsSortie = Number(dto.poidsSortie);
    }

    if (dto.prixUnitaire !== undefined) {
      operation.prixUnitaire = Number(dto.prixUnitaire);
    }

    if (dto.status !== undefined) {
      operation.status = dto.status;
    }

    this.recalculate(operation);

    return await operation.save();
  }

  async addAttachments(
    id: string,
    files: Express.Multer.File[] = [],
  ): Promise<FitouraInterface> {
    const operation = await this.fitouraModel.findById(id);
    if (!operation) throw new NotFoundException('Fitoura non trouvée');

    const newAttachments = this.mapFiles(files);
    operation.attachments = [...(operation.attachments || []), ...newAttachments];

    return await operation.save();
  }

  async removeAttachment(
    id: string,
    attachmentId: string,
  ): Promise<FitouraInterface> {
    const operation: any = await this.fitouraModel.findById(id);
    if (!operation) throw new NotFoundException('Fitoura non trouvée');

    const attachment = (operation.attachments || []).find(
      (item: any) => String(item._id) === attachmentId,
    );

    if (!attachment) {
      throw new NotFoundException('Pièce jointe non trouvée');
    }

    if (attachment.path && fs.existsSync(attachment.path)) {
      fs.unlinkSync(attachment.path);
    }

    operation.attachments = (operation.attachments || []).filter(
      (item: any) => String(item._id) !== attachmentId,
    );

    return await operation.save();
  }

  async searchCamions(search = ''): Promise<string[]> {
  const query: any = {
    matriculeCamion: {
      $exists: true,
      $nin: [null, ''],
    },
  };

  if (search.trim()) {
    query.matriculeCamion = {
      $regex: new RegExp(search.trim(), 'i'),
      $nin: [null, ''],
    };
  }

  const results = await this.fitouraModel.distinct('matriculeCamion', query);

  return results.sort((a, b) => String(a).localeCompare(String(b), 'fr'));
}

 async searchChauffeurs(search = ''): Promise<string[]> {
  const query: any = {
    chauffeur: {
      $exists: true,
      $nin: [null, ''],
    },
  };

  if (search.trim()) {
    query.chauffeur = {
      $regex: new RegExp(search.trim(), 'i'),
      $nin: [null, ''],
    };
  }

  const results = await this.fitouraModel.distinct('chauffeur', query);

  return results.sort((a, b) => String(a).localeCompare(String(b), 'fr'));
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
    const op: any = await this.fitouraModel.findById(id);
    if (!op) return;

    for (const attachment of op.attachments || []) {
      if (attachment.path && fs.existsSync(attachment.path)) {
        fs.unlinkSync(attachment.path);
      }
    }

    await this.fitouraModel.findByIdAndDelete(id);
  }
}