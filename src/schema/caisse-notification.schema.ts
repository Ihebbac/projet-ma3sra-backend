import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class CaisseNotification {
  @Prop({
    required: true,
    default: 'CLIENT_MARKED_UNPAID',
  })
  type: string;

  @Prop({ required: true })
  uniqueId: string;

  @Prop({ required: false })
  clientId?: string;

  @Prop({ required: false })
  caisseEntryId?: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  // Nouvelle info séparée pour la date du client
  @Prop({ required: false })
  clientCreatedDate?: Date;

  @Prop({ required: false, default: false })
  isRead: boolean;

  @Prop({
    required: false,
    default: 'active',
    enum: ['active', 'resolved'],
  })
  status: 'active' | 'resolved';

  @Prop({ required: false, default: Date.now })
  createdAt: Date;

  @Prop({ required: false })
  resolvedAt?: Date;

  @Prop({ required: false, default: '' })
  resolutionSource?: string;
}

export const CaisseNotificationSchema =
  SchemaFactory.createForClass(CaisseNotification);