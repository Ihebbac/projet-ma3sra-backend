import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type AbsenceType = 'ABSENT' | 'CONGE_NON_PAYE'
export type AvanceMode = 'CAISSE' | 'NOTE'

@Schema({ timestamps: true })
export class Employe extends Document {
  @Prop({ required: true })
  nom: string

  @Prop({ required: true })
  prenom: string

  @Prop({ required: true })
  numTel: string

  @Prop({ required: true })
  poste: string

  @Prop({ default: '' })
  statut: string

  @Prop({ type: Boolean, default: true })
  estActif: boolean

  @Prop({ required: true })
  montantJournalier: number

  @Prop({ required: false, default: 0 })
  montantHeure: number

  @Prop({ type: [Number], default: [0, 1, 2, 3, 4, 5, 6] })
  joursSemaineTravail: number[]

  @Prop({ type: String, default: null })
  dateDebutPresence?: string // YYYY-MM-DD

  @Prop({ type: String, default: null })
  dateFinPresence?: string // YYYY-MM-DD

  // ✅ IMPORTANT: "type" est un mot spécial => il faut écrire type: { type: String }
  @Prop({
    type: [
      {
        date: { type: String, required: true },
        type: { type: String, default: 'ABSENT' }, // ✅ champ "type"
        motif: { type: String },
      },
    ],
    default: [],
  })
  absences: { date: string; type?: AbsenceType; motif?: string }[]

  @Prop({
    type: [
      {
        date: { type: String, required: true },
        montant: { type: Number, required: true },
        mode: { type: String, default: 'NOTE' },
        note: { type: String },
      },
    ],
    default: [],
  })
  avances: { date: string; montant: number; mode: AvanceMode; note?: string }[]

  @Prop({ type: Array, default: [] })
  joursPayes: any[]

  @Prop({ type: Array, default: [] })
  joursTravailles: any[]
}

export const EmployeSchema = SchemaFactory.createForClass(Employe)