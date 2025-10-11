import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transactions.dto';
import { UpdateTransactionDto } from './dto/update-prop.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from '../schema/transaction.schema';
import { ITransaction } from 'src/interfaces/transaction.interface';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<ITransaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<any> {
    try {
      const newTransaction = new this.transactionModel(createTransactionDto);
      return await newTransaction.save();
    } catch (error) {
      throw new HttpException(
        'Error creating transaction: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<any[]> {
    const transactionsData = await this.transactionModel.find().exec();
    if (!transactionsData || transactionsData.length === 0) {
      throw new NotFoundException('No transactions found in the collection.');
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
    const updatedTransaction = await this.transactionModel.findByIdAndUpdate(
      id,
      updateTransactionDto,
      { new: true },
    );
    if (!updatedTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found for update.`);
    }
    return updatedTransaction;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deletedTransaction = await this.transactionModel.findByIdAndDelete(id).exec();
    if (!deletedTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found for deletion.`);
    }
    return { message: `Transaction with ID ${id} deleted successfully.` };
  }
}