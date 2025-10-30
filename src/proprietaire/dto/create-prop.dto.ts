import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateProprietaireDto {
  @IsString()
  @IsNotEmpty()
  nomPrenom: string;

  @IsOptional()
  @IsNumber()
  nombreCaisses?: number;

  @IsOptional()
  @IsNumber()
  quantiteOlive?: number;

  @IsOptional()
  @IsNumber()
  quantiteHuile?: number;

  @IsOptional()
  @IsNumber()
  kattou3?: number;

  @IsOptional()
  @IsNumber()
  nisba?: number;

  type: 'proprietaire';
  dateCreation?: Date;
  
  quantiteOliveNet?: number;
 

  nisbaReelle?: number;
  quantiteHuileTheorique?: number;
  differenceHuile?: number;
  nombreWiba?: number;
  nombreQfza?: number;
  huileParQfza?: number;


}