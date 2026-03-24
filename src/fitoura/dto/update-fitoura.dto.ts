import { Transform } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateFitouraDto {
  @IsOptional()
  @Transform(({ value }) =>
    value === '' || value === null || value === undefined
      ? undefined
      : Number(value),
  )
  @IsNumber()
  poidsSortie?: number;
}