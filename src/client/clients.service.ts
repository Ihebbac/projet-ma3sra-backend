import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomBytes } from 'crypto';

import { Client } from 'src/schema/client.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { CaisseService } from 'src/caisse/caisse.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<any>,
    private readonly caisseService: CaisseService,
  ) {}

  private generatePublicTrackingToken(): string {
    return randomBytes(32).toString('hex');
  }

  private buildPublicTrackingResponse(client: any) {
    const quantiteHuile = Number(client.quantiteHuile || 0);
    const statusHuile = quantiteHuile > 0 ? 'Prêt' : 'En cours';

    return {
      nomPrenom: client.nomPrenom,
      dateCreation: client.dateCreation,
      quantiteOlive: client.quantiteOlive,
      quantiteOliveNet: client.quantiteOliveNet,
      quantiteHuile: client.quantiteHuile,
      kattou3: client.kattou3,
      prixFinal: client.prixFinal,
      statusHuile,
    };
  }

  private ensureTrackingAccessAllowed(client: any): void {
    if (!client) {
      throw new NotFoundException(
        'Ce lien de suivi est invalide, désactivé ou la commande a déjà été réglée.',
      );
    }

    if (!client.publicTrackingToken) {
      throw new NotFoundException(
        'Ce lien de suivi est invalide, désactivé ou la commande a déjà été réglée.',
      );
    }

    if (client.trackingEnabled !== true) {
      throw new NotFoundException(
        'Ce lien de suivi est invalide, désactivé ou la commande a déjà été réglée.',
      );
    }

    if (client.status === 'payé') {
      throw new NotFoundException(
        'Ce lien de suivi est invalide, désactivé ou la commande a déjà été réglée.',
      );
    }
  }

  async create(createClientDto: CreateClientDto): Promise<any> {
    try {
      const initialStatus = createClientDto.status ?? 'non payé';

      const newClient = new this.clientModel({
        ...createClientDto,
        publicTrackingToken: this.generatePublicTrackingToken(),
        trackingEnabled: initialStatus !== 'payé',
      });

      return await newClient.save();
    } catch (error) {
      throw new HttpException(
        'Error creating Client: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<any[]> {
    return await this.clientModel.find().exec();
  }

  async findOne(id: string): Promise<any> {
    const clientData = await this.clientModel.findById(id).exec();

    if (!clientData) {
      throw new NotFoundException(`Client with ID ${id} not found.`);
    }

    let shouldSave = false;

    if (!clientData.publicTrackingToken) {
      clientData.publicTrackingToken = this.generatePublicTrackingToken();
      shouldSave = true;
    }

    if (typeof clientData.trackingEnabled !== 'boolean') {
      clientData.trackingEnabled = clientData.status !== 'payé';
      shouldSave = true;
    }

    if (shouldSave) {
      await clientData.save();
    }

    return clientData;
  }

  async findPublicTrackingByToken(token: string): Promise<any> {
    const client = await this.clientModel
      .findOne({
        publicTrackingToken: token,
      })
      .exec();

    this.ensureTrackingAccessAllowed(client);

    return this.buildPublicTrackingResponse(client);
  }

  async updateStatus(id: string, status: 'payé' | 'non payé'): Promise<any> {
    const client = await this.clientModel.findById(id).exec();

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found.`);
    }

    const previousStatus = client.status;
    client.status = status;
    client.trackingEnabled = status !== 'payé';

    if (!client.publicTrackingToken) {
      client.publicTrackingToken = this.generatePublicTrackingToken();
    }

    const updatedClient = await client.save();

    if (previousStatus === 'payé' && status === 'non payé') {
      await this.caisseService.invalidateClientPayment({
        uniqueId: String(client._id),
        clientId: String(client._id),
        clientName: client.nomPrenom,
        phone: client.numTelephone,
        createdDate: client.dateCreation,
        reason:
          'Le client a été remis en non payé après validation du paiement.',
      });
    }

    return updatedClient;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<any> {
    const existingClient = await this.clientModel.findById(id).exec();

    if (!existingClient) {
      throw new NotFoundException(`Client with ID ${id} not found for update.`);
    }

    const previousStatus = existingClient.status;

    const updatedClient = await this.clientModel
      .findByIdAndUpdate(id, updateClientDto, { new: true })
      .exec();

    if (!updatedClient) {
      throw new NotFoundException(`Client with ID ${id} not found for update.`);
    }

    let shouldSave = false;

    if (!updatedClient.publicTrackingToken) {
      updatedClient.publicTrackingToken = this.generatePublicTrackingToken();
      shouldSave = true;
    }

    const expectedTrackingEnabled = updatedClient.status !== 'payé';
    if (updatedClient.trackingEnabled !== expectedTrackingEnabled) {
      updatedClient.trackingEnabled = expectedTrackingEnabled;
      shouldSave = true;
    }

    if (shouldSave) {
      await updatedClient.save();
    }

    if (previousStatus === 'payé' && updatedClient.status === 'non payé') {
      await this.caisseService.invalidateClientPayment({
        uniqueId: String(updatedClient._id),
        clientId: String(updatedClient._id),
        clientName: updatedClient.nomPrenom,
        phone: updatedClient.numTelephone,
        createdDate: updatedClient.dateCreation,
        reason:
          'Le client a été remis en non payé après validation du paiement.',
      });
    }

    return updatedClient;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deletedClient = await this.clientModel.findByIdAndDelete(id).exec();

    if (!deletedClient) {
      throw new NotFoundException(
        `Client with ID ${id} not found for deletion.`,
      );
    }

    await this.caisseService.resolveNotificationsOnlyByUniqueId(
      String(deletedClient._id),
      'client-deleted',
    );

    return { message: `Client with ID ${id} deleted successfully.` };
  }
}