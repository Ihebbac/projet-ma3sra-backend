// create-client.dto.ts
export class CreateClientDto {
  nomPrenom: string;
  // numCIN: number;
  numTelephone: number;
  type: string;
  dateCreation?: Date;
  nombreCaisses?: number;
  quantiteOlive?: number;
  quantiteOliveNet?: number;
  quantiteHuile?: number;
  kattou3?: number;
  nisba?: number;
  nisbaReelle?: number;
  quantiteHuileTheorique?: number;
  differenceHuile?: number;
  nombreWiba?: number;
  nombreQfza?: number;
  huileParQfza?: number;
  prixFinal?:number
  prixKg?:number
}