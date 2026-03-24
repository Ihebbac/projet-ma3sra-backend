import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsIn,
  IsArray,
  IsInt,
  Min,
  Max,
  Matches,
} from 'class-validator'

export class CreateEmployeDto {
  @IsString()
  @IsNotEmpty()
  nom: string

  @IsString()
  @IsNotEmpty()
  prenom: string

  @IsString()
  @IsNotEmpty()
  numTel: string

  @IsString()
  @IsNotEmpty()
  poste: string

  // si tu l'utilises, sinon tu peux l'enlever
  @IsString()
  @IsOptional()
  statut?: string

  @IsNumber()
  montantJournalier: number

  @IsNumber()
  @IsOptional()
  montantHeure?: number

  // ✅ nouveau : début de comptage (optionnel)
  @IsString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'dateDebutPresence doit être YYYY-MM-DD' })
  dateDebutPresence?: string | null

  // ✅ nouveau : fin de comptage / arrêt saison (optionnel)
  @IsString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'dateFinPresence doit être YYYY-MM-DD' })
  dateFinPresence?: string | null

  // ✅ planning (optionnel) 0..6
  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(6, { each: true })
  joursSemaineTravail?: number[]
}