import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTransactionDto } from './dto/create-transactions.dto';
import { UpdateTransactionDto } from './dto/update-prop.dto';
import { Transaction } from '../schema/transaction.schema';
import { ITransaction } from 'src/interfaces/transaction.interface';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<ITransaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<any> {
    try {
      const payload = {
        date: createTransactionDto.date || new Date(),
        dateCreation: createTransactionDto.dateCreation || createTransactionDto.date || new Date(),

        typeStock: createTransactionDto.typeStock,
        type: createTransactionDto.type || createTransactionDto.typeStock,

        quantite: Number(createTransactionDto.quantite || 0),

        prix: Number(
          createTransactionDto.prix ??
            createTransactionDto.prixFinal ??
            0,
        ),

        prixFinal: Number(
          createTransactionDto.prixFinal ??
            createTransactionDto.prix ??
            0,
        ),

        motif: createTransactionDto.motif,

        details: createTransactionDto.details || '',
        commentaire:
          createTransactionDto.commentaire ||
          createTransactionDto.details ||
          '',

        proprietaireId: createTransactionDto.proprietaireId,

        clientNom:
          createTransactionDto.clientNom ||
          createTransactionDto.nomPrenom ||
          '',

        nomPrenom:
          createTransactionDto.nomPrenom ||
          createTransactionDto.clientNom ||
          '',

        operation: createTransactionDto.operation || 'retrait',

        clientId: createTransactionDto.clientId || null,
      };

      const newTransaction = new this.transactionModel(payload);
      return await newTransaction.save();
    } catch (error) {
      throw new HttpException(
        'Error creating transaction: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<any[]> {
    const transactionsData = await this.transactionModel
      .find()
      .sort({ date: -1, createdAt: -1 })
      .exec();

    if (!transactionsData || transactionsData.length === 0) {
      return [];
    }

    return transactionsData;
  }

  async findOne(id: string): Promise<any> {
    const transactionData = await this.transactionModel.findById(id).exec();
    if (!transactionData) {
      throw new NotFoundException(`Transaction with ID ${id} not found.`);
    }
    return transactionData;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<any> {
    const payload: Partial<CreateTransactionDto> = {
      ...updateTransactionDto,
    };

    if (payload.prix !== undefined) {
      payload.prix = Number(payload.prix);
    }

    if (payload.prixFinal !== undefined) {
      payload.prixFinal = Number(payload.prixFinal);
    }

    if (payload.quantite !== undefined) {
      payload.quantite = Number(payload.quantite);
    }

    const updatedTransaction = await this.transactionModel.findByIdAndUpdate(
      id,
      payload,
      { new: true },
    );

    if (!updatedTransaction) {
      throw new NotFoundException(
        `Transaction with ID ${id} not found for update.`,
      );
    }

    return updatedTransaction;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deletedTransaction = await this.transactionModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedTransaction) {
      throw new NotFoundException(
        `Transaction with ID ${id} not found for deletion.`,
      );
    }

    return { message: `Transaction with ID ${id} deleted successfully.` };
  }
}