import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AchatBase } from '../schema/achat-base.schema.ts';
import {
  CreateAchatBaseDto,
  UpdateAchatBaseDto,
  TotalsAchatBaseDto,
} from './dto/achat.dto';

@Injectable()
export class AchatBaseService {
  constructor(
    @InjectModel(AchatBase.name)
    private achatBaseModel: Model<AchatBase>,
  ) {}

  private round2(value: number): number {
    return Math.round((Number(value) || 0) * 100) / 100;
  }

  async create(createAchatBaseDto: CreateAchatBaseDto): Promise<AchatBase> {
    const createdAchat = new this.achatBaseModel({
      ...createAchatBaseDto,
      isPaid: createAchatBaseDto.isPaid ?? false,
    });

    return createdAchat.save();
  }

  async findAll(): Promise<AchatBase[]> {
    return this.achatBaseModel
      .find()
      .sort({ dateAchat: -1, createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<AchatBase> {
    const achat = await this.achatBaseModel.findById(id).exec();

    if (!achat) {
      throw new NotFoundException('Achat base introuvable');
    }

    return achat;
  }

  async update(id: string, updateAchatBaseDto: UpdateAchatBaseDto): Promise<AchatBase> {
    const existing = await this.achatBaseModel.findById(id).exec();

    if (!existing) {
      throw new NotFoundException('Achat base introuvable');
    }

    const updated = await this.achatBaseModel
      .findByIdAndUpdate(
        id,
        {
          ...updateAchatBaseDto,
        },
        { new: true },
      )
      .exec();

    if (!updated) {
      throw new NotFoundException('Achat base introuvable après mise à jour');
    }

    return updated;
  }

  async delete(id: string): Promise<AchatBase> {
    const deleted = await this.achatBaseModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new NotFoundException('Achat base introuvable');
    }

    return deleted;
  }

  async getTotals(): Promise<TotalsAchatBaseDto> {
    const aggregationResult = await this.achatBaseModel
      .aggregate([
        {
          $group: {
            _id: null,
            totalOliveBrute: { $sum: '$quantiteOliveBrute' },
            totalOliveNet: { $sum: '$quantiteOliveNet' },
            totalHuileNet: { $sum: '$quantiteHuileNet' },
            totalCoutAchat: { $sum: '$coutAchatClient' },
          },
        },
      ])
      .exec();

    if (aggregationResult.length === 0) {
      return {
        totalOliveBrute: 0,
        totalOliveNet: 0,
        totalHuileNet: 0,
        totalCoutAchat: 0,
      };
    }

    const totals = aggregationResult[0];

    return {
      totalOliveBrute: this.round2(totals.totalOliveBrute),
      totalOliveNet: this.round2(totals.totalOliveNet),
      totalHuileNet: this.round2(totals.totalHuileNet),
      totalCoutAchat: this.round2(totals.totalCoutAchat),
    };
  }
}