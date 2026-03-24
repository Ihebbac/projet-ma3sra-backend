export class CreateCaisseDto {
  motif: string;
  montant: number;
  type: string;
  date: string;
  uniqueId: string;
  commentaire: string;
  nomutilisatuer?: string;

  // Champs additifs pour l’alerte client non payé
  paymentInvalidated?: boolean;
  caisseAlertStatus?: 'none' | 'pending' | 'resolved';
  alertBadge?: string;
  invalidatedAt?: Date;
  invalidationReason?: string;
  invalidatedSource?: string;
  originalMotif?: string;
  originalCommentaire?: string;

  // Flag purement technique pour l’update
  resolveClientPaymentAlert?: boolean;
}