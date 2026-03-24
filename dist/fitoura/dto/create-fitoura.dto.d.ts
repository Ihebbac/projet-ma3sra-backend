export type FitouraStatus = 'EN_COURS' | 'TERMINE';
export declare class CreateFitouraDto {
    matriculeCamion?: string;
    chauffeur?: string;
    poidsEntree?: number;
    poidsSortie?: number;
    prixUnitaire?: number;
    status?: FitouraStatus;
}
