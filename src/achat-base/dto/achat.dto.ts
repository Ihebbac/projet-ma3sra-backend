// Ce DTO contient désormais TOUS les champs, y compris les champs calculés,
// car c'est le FRONTEND qui les calculera et les enverra pour sauvegarde.

import { IsDateString, IsNumber, IsNotEmpty, Min, IsPositive, IsString, IsOptional } from 'class-validator';

export class CreateAchatBaseDto {
    @IsNotEmpty()
    @IsDateString()
    readonly dateAchat: string;

    @IsNotEmpty()
    @IsString()
    readonly nomPrenom: string;

    @IsOptional()
    @IsString()
    readonly numTel?: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    readonly nbreCaisse: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(0.1)
    readonly quantiteOliveBrute: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(0.1)
    readonly poidWiba: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(0.1)
    readonly prixBase: number;
    
    // --- Champs CALCULÉS ajoutés par le Frontend ---
    
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    readonly quantiteOliveNet: number; 

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    readonly quantiteHuileNet: number; 

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    readonly nisba: number; 

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    readonly ktou3: number; 

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    readonly coutAchatClient: number;
    
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    readonly fraisTransformation: number; 

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    readonly prixTotalVenteHuile: number; 
}



export class UpdateAchatBaseDto extends CreateAchatBaseDto {}

// DTO pour les totaux
export class TotalsAchatBaseDto {
    totalOliveBrute: number;
    totalOliveNet: number;
    totalHuileNet: number;
    totalCoutAchat: number;
}