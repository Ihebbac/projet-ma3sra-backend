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
import { UpdateCaisseDto } from './dto/update-caisse.dto';
import { CaisseNotificationsService } from './caisse-notifications.service';

@Injectable()
export class CaisseService {
  constructor(
    @InjectModel(Caisse.name) private caisseModel: Model<any>,
    private readonly caisseNotificationsService: CaisseNotificationsService,
  ) {}

  private formatDate(value?: string | Date): string {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${day}-${month}-${year}`;
  }

  private buildInvalidatedMotif(originalMotif?: string): string {
    const baseMotif = (originalMotif || 'Payment Client')
      .replace(/\s*\[CLIENT NON PAYÉ\]\s*$/gi, '')
      .replace(/\s*\[CORRIGÉ\]\s*$/gi, '')
      .trim();

    return `${baseMotif} [CLIENT NON PAYÉ]`;
  }

  private buildResolvedMotif(originalMotif?: string): string {
    const baseMotif = (originalMotif || 'Payment Client')
      .replace(/\s*\[CLIENT NON PAYÉ\]\s*$/gi, '')
      .replace(/\s*\[CORRIGÉ\]\s*$/gi, '')
      .trim();

    return `${baseMotif} [CORRIGÉ]`;
  }

  private buildInvalidatedComment(params: {
    clientName?: string;
    phone?: number;
    createdDate?: string | Date;
    reason?: string;
    originalCommentaire?: string;
    amount?: number;
  }): string {
    const lines: string[] = [];

    lines.push('[BADGE: Client marqué non payé]');
    lines.push(
      'ALERTE CAISSE : ce client a été remis en non payé depuis le module client.',
    );

    if (params.clientName || params.phone) {
      lines.push(
        `Client : ${params.clientName || '-'}${
          params.phone ? ` | Téléphone : ${params.phone}` : ''
        }`,
      );
    }

    const formattedDate = this.formatDate(params.createdDate);
    if (formattedDate) {
      lines.push(`Date client : ${formattedDate}`);
    }

    if (typeof params.amount === 'number') {
      lines.push(`Montant actuel en caisse : ${params.amount.toFixed(2)} DT`);
    }

    if (params.reason) {
      lines.push(`Motif : ${params.reason}`);
    }

    if (params.originalCommentaire && params.originalCommentaire.trim()) {
      lines.push('--- Commentaire original ---');
      lines.push(params.originalCommentaire.trim());
    }

    return lines.join('\n');
  }

  private buildResolvedComment(params: {
    clientName?: string;
    phone?: number;
    createdDate?: string | Date;
    originalCommentaire?: string;
    previousAmount?: number;
  }): string {
    const lines: string[] = [];

    lines.push('[TRACE CONSERVÉE]');
    lines.push('Cette ligne a été corrigée après passage du client en non payé.');
    lines.push('Montant forcé à 0 DT afin de retirer son impact du total caisse.');

    if (params.clientName || params.phone) {
      lines.push(
        `Client : ${params.clientName || '-'}${
          params.phone ? ` | Téléphone : ${params.phone}` : ''
        }`,
      );
    }

    const formattedDate = this.formatDate(params.createdDate);
    if (formattedDate) {
      lines.push(`Date client : ${formattedDate}`);
    }

    if (typeof params.previousAmount === 'number') {
      lines.push(`Ancien montant caisse : ${params.previousAmount.toFixed(2)} DT`);
    }

    if (params.originalCommentaire && params.originalCommentaire.trim()) {
      lines.push('--- Commentaire original ---');
      lines.push(params.originalCommentaire.trim());
    }

    return lines.join('\n');
  }

  private async resolveClientPaymentTraceOnDocument(
    caisseDoc: any,
  ): Promise<any> {
    if (!caisseDoc) return null;

    const originalCommentaire =
      typeof caisseDoc.originalCommentaire === 'string'
        ? caisseDoc.originalCommentaire
        : caisseDoc.commentaire || '';

    const clientNameMatch = caisseDoc.commentaire?.match(/Client\s:\s(.+?)(\s\||\n|$)/i);
    const phoneMatch = caisseDoc.commentaire?.match(/Téléphone\s:\s(\d+)/i);
    const clientDateMatch = caisseDoc.commentaire?.match(/Date client\s:\s(\d{2}-\d{2}-\d{4})/i);

    const previousAmount = Number(caisseDoc.montant || 0);

    caisseDoc.montant = 0;
    caisseDoc.paymentInvalidated = false;
    caisseDoc.caisseAlertStatus = 'resolved';
    caisseDoc.alertBadge = '';
    caisseDoc.invalidatedAt = undefined;
    caisseDoc.invalidationReason = '';
    caisseDoc.invalidatedSource = '';

    caisseDoc.motif = this.buildResolvedMotif(
      caisseDoc.originalMotif || caisseDoc.motif,
    );

    let parsedClientDate: Date | undefined;
    if (clientDateMatch?.[1]) {
      const [day, month, year] = clientDateMatch[1].split('-').map(Number);
      parsedClientDate = new Date(year, month - 1, day);
    }

    caisseDoc.commentaire = this.buildResolvedComment({
      clientName: clientNameMatch?.[1]?.trim(),
      phone: phoneMatch?.[1] ? Number(phoneMatch[1]) : undefined,
      createdDate: parsedClientDate,
      previousAmount,
      originalCommentaire,
    });

    return await caisseDoc.save();
  }

  async create(createCaisseDto: CreateCaisseDto): Promise<any> {
    try {
      if (createCaisseDto?.uniqueId) {
        await this.caisseModel.findOneAndDelete({
          uniqueId: createCaisseDto.uniqueId,
        });
      }

      const payload = {
        ...createCaisseDto,
        paymentInvalidated: createCaisseDto.paymentInvalidated ?? false,
        caisseAlertStatus: createCaisseDto.caisseAlertStatus ?? 'none',
        alertBadge: createCaisseDto.alertBadge ?? '',
        invalidatedAt: createCaisseDto.invalidatedAt,
        invalidationReason: createCaisseDto.invalidationReason ?? '',
        invalidatedSource: createCaisseDto.invalidatedSource ?? '',
        originalMotif: createCaisseDto.originalMotif ?? '',
        originalCommentaire: createCaisseDto.originalCommentaire ?? '',
      };

      const newCaisse = new this.caisseModel(payload);
      const savedCaisse = await newCaisse.save();

      if (savedCaisse?.uniqueId && savedCaisse.caisseAlertStatus !== 'pending') {
        await this.caisseNotificationsService.resolveActiveByUniqueId(
          savedCaisse.uniqueId,
          'new-caisse-entry-created',
        );
      }

      return savedCaisse;
    } catch (error) {
      throw new HttpException(
        'Error creating Caisse: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<any[]> {
    const caissesData = await this.caisseModel.find().sort({ date: -1 }).exec();
    if (!caissesData || caissesData.length === 0) {
      throw new NotFoundException('No Caisses found in the collection.');
    }
    return caissesData;
  }

  async findOne(id: string): Promise<any> {
    const caisseData = await this.caisseModel.findById(id).exec();
    if (!caisseData) {
      throw new NotFoundException(`Caisse with ID ${id} not found.`);
    }
    return caisseData;
  }

  async update(id: string, updateCaisseDto: UpdateCaisseDto): Promise<any> {
    const existingCaisse = await this.caisseModel.findById(id).exec();

    if (!existingCaisse) {
      throw new NotFoundException(`Caisse with ID ${id} not found for update.`);
    }

    const shouldResolveAlert =
      updateCaisseDto.resolveClientPaymentAlert === true ||
      Number(updateCaisseDto.montant) === 0;

    if (shouldResolveAlert && existingCaisse.uniqueId) {
      await this.resolveClientPaymentTraceByUniqueId(
        existingCaisse.uniqueId,
        'caisse-manual-update',
      );

      return await this.caisseModel.findById(id).exec();
    }

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

    if (deletedCaisse.uniqueId) {
      await this.caisseNotificationsService.resolveActiveByUniqueId(
        deletedCaisse.uniqueId,
        'caisse-entry-deleted',
      );
    }

    return { message: `Caisse with ID ${id} deleted successfully.` };
  }

  async removeByUniqueId(uniqueId: string): Promise<{ message: string }> {
    const deletedCaisse = await this.caisseModel
      .findOneAndDelete({ uniqueId })
      .exec();

    if (!deletedCaisse) {
      throw new NotFoundException(
        `Caisse with uniqueId ${uniqueId} not found for deletion.`,
      );
    }

    await this.caisseNotificationsService.resolveActiveByUniqueId(
      uniqueId,
      'caisse-entry-deleted-by-uniqueId',
    );

    return { message: `Caisse with uniqueId ${uniqueId} deleted successfully.` };
  }

  async invalidateClientPayment(data: {
    uniqueId: string;
    clientId?: string;
    clientName?: string;
    phone?: number;
    createdDate?: string | Date;
    reason?: string;
  }): Promise<any> {
    const caisseEntry = await this.caisseModel
      .findOne({ uniqueId: data.uniqueId })
      .sort({ date: -1 })
      .exec();

    const notificationTitle = 'Client marqué non payé';
    const formattedClientDate = this.formatDate(data.createdDate);
    const notificationMessage = [
      `Le client ${data.clientName || ''} a été remis en non payé après enregistrement de son paiement en caisse.`,
      formattedClientDate ? `Date client : ${formattedClientDate}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    if (!caisseEntry) {
      await this.caisseNotificationsService.createOrReactivate({
        uniqueId: data.uniqueId,
        clientId: data.clientId,
        title: notificationTitle,
        message: notificationMessage,
        clientCreatedDate: data.createdDate,
      });

      return null;
    }

    if (!caisseEntry.originalMotif) {
      caisseEntry.originalMotif = caisseEntry.motif || '';
    }

    if (typeof caisseEntry.originalCommentaire !== 'string') {
      caisseEntry.originalCommentaire = caisseEntry.commentaire || '';
    }

    caisseEntry.motif = this.buildInvalidatedMotif(caisseEntry.originalMotif);
    caisseEntry.commentaire = this.buildInvalidatedComment({
      clientName: data.clientName,
      phone: data.phone,
      createdDate: data.createdDate,
      reason:
        data.reason ||
        'Le client a été remis en non payé après validation du paiement.',
      originalCommentaire: caisseEntry.originalCommentaire,
      amount: Number(caisseEntry.montant || 0),
    });

    caisseEntry.paymentInvalidated = true;
    caisseEntry.caisseAlertStatus = 'pending';
    caisseEntry.alertBadge = 'Client marqué non payé';
    caisseEntry.invalidatedAt = new Date();
    caisseEntry.invalidationReason =
      data.reason ||
      'Le client a été remis en non payé après validation du paiement.';
    caisseEntry.invalidatedSource = 'client-status-change';

    const savedEntry = await caisseEntry.save();

    await this.caisseNotificationsService.createOrReactivate({
      uniqueId: data.uniqueId,
      clientId: data.clientId,
      caisseEntryId: String(savedEntry._id),
      title: notificationTitle,
      message: notificationMessage,
      clientCreatedDate: data.createdDate,
    });

    return savedEntry;
  }

  async resolveClientPaymentTraceByUniqueId(
    uniqueId: string,
    resolutionSource = 'manual',
  ): Promise<void> {
    const caisseEntries = await this.caisseModel.find({ uniqueId }).exec();

    for (const caisseEntry of caisseEntries) {
      await this.resolveClientPaymentTraceOnDocument(caisseEntry);
    }

    await this.caisseNotificationsService.resolveActiveByUniqueId(
      uniqueId,
      resolutionSource,
    );
  }

  async resolveNotificationsOnlyByUniqueId(
    uniqueId: string,
    resolutionSource = 'manual',
  ): Promise<void> {
    await this.caisseNotificationsService.resolveActiveByUniqueId(
      uniqueId,
      resolutionSource,
    );
  }
} 