import { IsDateString, IsNumber, IsNotEmpty, IsOptional, Min, IsPositive } from 'class-validator';

export class CreateAchatDto {
    @IsNotEmpty()
    @IsDateString()
    readonly dateAchat: string; // Format YYYY-MM-DD

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(0.1)
    readonly quantiteOlive: number; // Poids brut (kg)

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    readonly nbreCaisse: number; // Nombre de caisses

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(0.1)
    readonly poidWiba: number; // Poids Wiba unitaire (kg)

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(0.1)
    readonly prixWiba: number; // Prix Wiba (Dinar)
}

// Pour la mise à jour, tous les champs peuvent être optionnels, mais doivent exister s'ils sont envoyés.
export class UpdateAchatDto extends CreateAchatDto {}

// DTO pour les totaux (sera utilisé dans le frontend)
export class TotalsDto {
    totalQuantiteOlive: number;
    totalQuantiteOliveNet: number;
    totalProduitWiba: number;
    totalCout: number;
}