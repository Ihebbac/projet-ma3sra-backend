import { IsOptional, IsNumber } from 'class-validator';

export class UpdateFitouraDto {
  @IsOptional()
  @IsNumber()
  poidsSortie?: number;
}
