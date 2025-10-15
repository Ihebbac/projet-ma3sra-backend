import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from '../schema/client.schema';
import { IClient } from 'src/interfaces/client.interface';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<IClient>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<any> {
    try {
      const newClient = new this.clientModel(createClientDto);
      return await newClient.save();
    } catch (error) {
      throw new HttpException(
        'Error creating client: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<any[]> {
    const clientsData = await this.clientModel.find().exec();
    if (!clientsData || clientsData.length === 0) {
      throw new NotFoundException('No clients found in the collection.');
    }
    return clientsData;
  }

  async findOne(id: string): Promise<any> {
    const clientData = await this.clientModel.findById(id).exec();
    if (!clientData) {
      throw new NotFoundException(`Client with ID ${id} not found.`);
    }
    return clientData;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<any> {
    const updatedClient = await this.clientModel.findByIdAndUpdate(
      id,
      updateClientDto,
      { new: true },
    );
    if (!updatedClient) {
      throw new NotFoundException(`Client with ID ${id} not found for update.`);
    }
    return updatedClient;
  }
  async updateStatus(id: string, status: 'payé' | 'non payé'): Promise<any> {
    const updatedClient = await this.clientModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!updatedClient) {
      throw new NotFoundException(`Client with ID ${id} not found for status update.`);
    }
    return updatedClient;
  }
  async remove(id: string): Promise<{ message: string }> {
    const deletedClient = await this.clientModel.findByIdAndDelete(id).exec();
    if (!deletedClient) {
      throw new NotFoundException(`Client with ID ${id} not found for deletion.`);
    }
    return { message: `Client with ID ${id} deleted successfully.` };
  }
}
