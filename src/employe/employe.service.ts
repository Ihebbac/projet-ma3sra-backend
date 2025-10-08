import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employe } from '../schema/employe.schema';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';

@Injectable()
export class EmployeService {
  constructor(
    @InjectModel(Employe.name)
    private employeModel: Model<Employe>,
  ) {}

  async create(createEmployeDto: CreateEmployeDto): Promise<Employe> {
    const employe = new this.employeModel(createEmployeDto);
    return employe.save();
  }

  async findAll(): Promise<Employe[]> {
    return this.employeModel.find().exec();
  }

  async findOne(id: string): Promise<Employe> {
    const employe = await this.employeModel.findById(id).exec();
    if (!employe) throw new NotFoundException('Employé non trouvé');
    return employe;
  }

  async update(id: string, updateEmployeDto: UpdateEmployeDto): Promise<Employe> {
    const employe = await this.employeModel.findByIdAndUpdate(id, updateEmployeDto, { new: true }).exec();
    if (!employe) throw new NotFoundException('Employé non trouvé');
    return employe;
  }

  async remove(id: string): Promise<void> {
    const result = await this.employeModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Employé non trouvé');
  }

  // ✅ Marquer la présence d’un employé pour aujourd’hui
  async markPresence(id: string): Promise<Employe> {
    const employe = await this.findOne(id);
    const today = new Date();
    const isAlreadyMarked = employe.joursTravailles.some(
      (d) => d.toDateString() === today.toDateString(),
    );

    if (!isAlreadyMarked) {
      employe.joursTravailles.push(today);
      await employe.save();
    }

    return employe;
  }

  // ✅ Calcul salaire total pour une période donnée
  async calculSalaire(id: string, startDate?: Date, endDate?: Date): Promise<number> {
    const employe = await this.findOne(id);

    let joursTravailles = employe.joursTravailles;
    if (startDate && endDate) {
      joursTravailles = joursTravailles.filter(
        (jour) => jour >= startDate && jour <= endDate,
      );
    }

    const salaireTotal = joursTravailles.length * employe.montantJournalier;
    return salaireTotal;
  }
}
