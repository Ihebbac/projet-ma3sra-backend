import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEmployeDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  prenom: string;

  @IsString()
  @IsNotEmpty()
  numTel: string;

  @IsString()
  @IsNotEmpty()
  poste: string;

  @IsNumber()
  montantJournalier: number;
}
