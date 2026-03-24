export declare class CreateTransactionDto {
    date: Date;
    dateCreation?: Date;
    typeStock: 'olive' | 'huile';
    type?: 'olive' | 'huile';
    quantite: number;
    prix: number;
    prixFinal?: number;
    motif: string;
    details?: string;
    commentaire?: string;
    proprietaireId: string;
    clientNom?: string;
    nomPrenom?: string;
    operation?: 'ajout' | 'retrait';
    clientId?: string | null;
}
