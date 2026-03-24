export declare class CreateEmployeDto {
    nom: string;
    prenom: string;
    numTel: string;
    poste: string;
    statut?: string;
    montantJournalier: number;
    montantHeure?: number;
    dateDebutPresence?: string | null;
    dateFinPresence?: string | null;
    joursSemaineTravail?: number[];
}
