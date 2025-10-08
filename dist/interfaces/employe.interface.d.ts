export interface IEmploye {
    id?: string;
    nom: string;
    prenom: string;
    numTel: string;
    poste: string;
    montantJournalier: number;
    joursTravailles?: Date[];
}
