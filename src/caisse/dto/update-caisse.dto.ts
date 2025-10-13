import { PartialType } from '@nestjs/mapped-types';
import { CreateCaisseDto } from './create-caisse.dto';

export class UpdateCaissetDto extends PartialType(CreateCaisseDto) {}
