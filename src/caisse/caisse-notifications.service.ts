import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CaisseNotification } from 'src/schema/caisse-notification.schema';

@Injectable()
export class CaisseNotificationsService {
  constructor(
    @InjectModel(CaisseNotification.name)
    private caisseNotificationModel: Model<any>,
  ) {}

  async createOrReactivate(data: {
    uniqueId: string;
    clientId?: string;
    caisseEntryId?: string;
    title: string;
    message: string;
    type?: string;
    clientCreatedDate?: string | Date;
  }): Promise<any> {
    const existingActive = await this.caisseNotificationModel
      .findOne({
        uniqueId: data.uniqueId,
        status: 'active',
        type: data.type || 'CLIENT_MARKED_UNPAID',
      })
      .exec();

    const normalizedClientDate = data.clientCreatedDate
      ? new Date(data.clientCreatedDate)
      : undefined;

    if (existingActive) {
      existingActive.title = data.title;
      existingActive.message = data.message;
      existingActive.caisseEntryId = data.caisseEntryId;
      existingActive.clientId = data.clientId;
      existingActive.clientCreatedDate = normalizedClientDate;
      existingActive.isRead = false;
      existingActive.createdAt = new Date();
      return await existingActive.save();
    }

    const notification = new this.caisseNotificationModel({
      type: data.type || 'CLIENT_MARKED_UNPAID',
      uniqueId: data.uniqueId,
      clientId: data.clientId,
      caisseEntryId: data.caisseEntryId,
      title: data.title,
      message: data.message,
      clientCreatedDate: normalizedClientDate,
      isRead: false,
      status: 'active',
      createdAt: new Date(),
    });

    return await notification.save();
  }

  async findAll(): Promise<any[]> {
    return await this.caisseNotificationModel
      .find()
      .sort({ createdAt: -1 })
      .exec();
  }

  async getUnreadCount(): Promise<{ unread: number }> {
    const unread = await this.caisseNotificationModel.countDocuments({
      isRead: false,
      status: 'active',
    });

    return { unread };
  }

  async markAsRead(id: string): Promise<any> {
    const notification = await this.caisseNotificationModel
      .findByIdAndUpdate(id, { isRead: true }, { new: true })
      .exec();

    if (!notification) {
      throw new NotFoundException(
        `Notification with ID ${id} not found for read update.`,
      );
    }

    return notification;
  }

  async resolveById(id: string): Promise<any> {
    const notification = await this.caisseNotificationModel
      .findByIdAndUpdate(
        id,
        {
          status: 'resolved',
          isRead: true,
          resolvedAt: new Date(),
        },
        { new: true },
      )
      .exec();

    if (!notification) {
      throw new NotFoundException(
        `Notification with ID ${id} not found for resolve.`,
      );
    }

    return notification;
  }

  async resolveActiveByUniqueId(
    uniqueId: string,
    resolutionSource = 'manual',
  ): Promise<void> {
    await this.caisseNotificationModel.updateMany(
      {
        uniqueId,
        status: 'active',
      },
      {
        $set: {
          status: 'resolved',
          isRead: true,
          resolvedAt: new Date(),
          resolutionSource,
        },
      },
    );
  }
}