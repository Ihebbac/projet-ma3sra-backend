import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Caisse } from 'src/schema/caisse.schema';
import { CreateCaisseDto } from './dto/create-caisse.dto';

@Injectable()
export class CaisseService {
  constructor(@InjectModel(Caisse.name) private caisseModel: Model<any>) {}

  async create(createCaisseDto: CreateCaisseDto): Promise<any> {
    try {
      if (createCaisseDto?.uniqueId) {
        await this.caisseModel.findOneAndDelete({
          uniqueId: createCaisseDto.uniqueId,
        });
      }

      const newCaisse = new this.caisseModel(createCaisseDto);
      return await newCaisse.save();
    } catch (error) {
      throw new HttpException(
        'Error creating Caisse: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<any[]> {
    const CaissesData = await this.caisseModel.find().exec();
    if (!CaissesData || CaissesData.length === 0) {
      throw new NotFoundException('No Caisses found in the collection.');
    }
    return CaissesData;
  }

  async findOne(id: string): Promise<any> {
    const CaisseData = await this.caisseModel.findById(id).exec();
    if (!CaisseData) {
      throw new NotFoundException(`Caisse with ID ${id} not found.`);
    }
    return CaisseData;
  }

  async update(id: string, updateCaisseDto: CreateCaisseDto): Promise<any> {
    const updatedCaisse = await this.caisseModel.findByIdAndUpdate(
      id,
      updateCaisseDto,
      { new: true },
    );
    if (!updatedCaisse) {
      throw new NotFoundException(`Caisse with ID ${id} not found for update.`);
    }
    return updatedCaisse;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deletedCaisse = await this.caisseModel.findByIdAndDelete(id).exec();
    if (!deletedCaisse) {
      throw new NotFoundException(
        `Caisse with ID ${id} not found for deletion.`,
      );
    }
    return { message: `Caisse with ID ${id} deleted successfully.` };
  }
  async removeByUniqueId(uniqueId: string): Promise<{ message: string }> {
    const deletedCaisse = await this.caisseModel
      .findOneAndDelete({ uniqueId: uniqueId })
      .exec();
    if (!deletedCaisse) {
      throw new NotFoundException(
        `Caisse with ID ${uniqueId} not found for deletion.`,
      );
    }
    return { message: `Caisse with ID ${uniqueId} deleted successfully.` };
  }
}
