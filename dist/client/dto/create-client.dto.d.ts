export declare class CreateClientDto {
    nomPrenom: string;
    commentaire: string;
    numTelephone: number;
    type: string;
    dateCreation?: Date;
    nombreCaisses?: number;
    quantiteOlive?: number;
    quantiteOliveNet?: number;
    quantiteHuile?: number;
    kattou3?: number;
    nisba?: number;
    nisbaReelle?: number;
    quantiteHuileTheorique?: number;
    differenceHuile?: number;
    nombreWiba?: number;
    nombreQfza?: number;
    huileParQfza?: number;
    prixFinal?: number;
    prixKg?: number;
    status: 'payé' | 'non payé';
    nomutilisatuer?: string;
}
