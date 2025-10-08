import { IsString, IsNumber } from 'class-validator';

export class CreateFitouraDto {
  @IsString()
  matriculeCamion: string;

  @IsString()
  chauffeur: string;

  @IsNumber()
  poidsEntree: number;

  @IsNumber()
  prixUnitaire: number;
}
