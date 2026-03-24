import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Caisse {
  @Prop({ required: true })
  motif: string;

  @Prop({ required: true })
  montant: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: false })
  uniqueId: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: false, default: '' })
  commentaire: string;

  @Prop({ required: false })
  nomutilisatuer?: string;

  // Champs additifs pour l’alerte "client marqué non payé"
  @Prop({ required: false, default: false })
  paymentInvalidated: boolean;

  @Prop({
    required: false,
    default: 'none',
    enum: ['none', 'pending', 'resolved'],
  })
  caisseAlertStatus: 'none' | 'pending' | 'resolved';

  @Prop({ required: false, default: '' })
  alertBadge: string;

  @Prop({ required: false })
  invalidatedAt?: Date;

  @Prop({ required: false, default: '' })
  invalidationReason?: string;

  @Prop({ required: false, default: '' })
  invalidatedSource?: string;

  @Prop({ required: false, default: '' })
  originalMotif?: string;

  @Prop({ required: false, default: '' })
  originalCommentaire?: string;
}

export const CaisseSchema = SchemaFactory.createForClass(Caisse);