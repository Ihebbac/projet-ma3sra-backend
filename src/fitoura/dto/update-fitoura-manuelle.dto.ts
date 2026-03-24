import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsIn } from 'class-validator';
import { FitouraStatus } from '../../interfaces/fitoura.interface';

export class UpdateFitouraManuelleDto {
  @IsOptional()
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsString()
  matriculeCamion?: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsString()
  chauffeur?: string;

  @IsOptional()
  @Transform(({ value }) =>
    value === '' || value === null || value === undefined
      ? undefined
      : Number(value),
  )
  @IsNumber()
  poidsEntree?: number;

  @IsOptional()
  @Transform(({ value }) =>
    value === '' || value === null || value === undefined
      ? undefined
      : Number(value),
  )
  @IsNumber()
  poidsSortie?: number;

  @IsOptional()
  @Transform(({ value }) =>
    value === '' || value === null || value === undefined
      ? undefined
      : Number(value),
  )
  @IsNumber()
  prixUnitaire?: number;

  @IsOptional()
  @IsIn(['EN_COURS', 'TERMINE'])
  status?: FitouraStatus;
}