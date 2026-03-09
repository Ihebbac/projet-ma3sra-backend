import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateFitouraManuelleDto {
  @IsOptional()
  @IsString()
  matriculeCamion?: string;

  @IsOptional()
  @IsString()
  chauffeur?: string;

  @IsOptional()
  @IsNumber()
  poidsEntree?: number;

  @IsOptional()
  @IsNumber()
  poidsSortie?: number;

  @IsOptional()
  @IsNumber()
  prixUnitaire?: number;

  @IsOptional()
  @IsString()
  status?: string;
}
