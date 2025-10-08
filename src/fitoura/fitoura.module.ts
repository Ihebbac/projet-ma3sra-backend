import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Fitoura, FitouraSchema } from '../schema/fitoura.schema';
import { FitouraService } from './fitoura.service';
import { FitouraController } from './fitoura.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Fitoura.name, schema: FitouraSchema }])],
  providers: [FitouraService],
  controllers: [FitouraController],
})
export class FitouraModule {}
