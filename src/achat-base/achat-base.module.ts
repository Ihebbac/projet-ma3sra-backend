import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AchatBaseController } from './achat-base.controller';
import { AchatBaseService } from './achat-base.service';
import { AchatBase, AchatBaseSchema } from '../schema/achat-base.schema.ts';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AchatBase.name, schema: AchatBaseSchema }]),
  ],
  controllers: [AchatBaseController],
  providers: [AchatBaseService],
})
export class AchatBaseModule {}