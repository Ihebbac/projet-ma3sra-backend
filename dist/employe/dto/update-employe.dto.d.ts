import { CreateEmployeDto } from './create-employe.dto';
export type AbsenceType = 'ABSENT' | 'CONGE_NON_PAYE';
export type AvanceMode = 'CAISSE' | 'NOTE';
declare const UpdateEmployeDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateEmployeDto>>;
export declare class UpdateEmployeDto extends UpdateEmployeDto_base {
    dateDebutPresence?: string | null;
    dateFinPresence?: string | null;
    joursSemaineTravail?: number[];
    absences?: {
        date: string;
        type?: AbsenceType;
        motif?: string;
    }[];
    avances?: {
        date: string;
        montant: number;
        mode: AvanceMode;
        note?: string;
    }[];
    joursPayes?: {
        date: string;
        heuresSup?: number;
    }[];
    joursTravailles?: {
        date: string;
        heuresSup?: number;
    }[];
}
export {};
