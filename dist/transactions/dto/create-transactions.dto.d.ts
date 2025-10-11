export declare class CreateTransactionDto {
    date: Date;
    typeStock: 'olive' | 'huile';
    quantite: number;
    clientNom: string;
    motif: string;
    details?: string;
    proprietaireId: string;
    clientId: string;
}
