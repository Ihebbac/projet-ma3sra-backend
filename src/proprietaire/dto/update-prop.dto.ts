import { PartialType } from '@nestjs/mapped-types';
import { CreateProprietaireDto } from './create-prop.dto';

export class UpdateProprietaireDto extends PartialType(CreateProprietaireDto) {}