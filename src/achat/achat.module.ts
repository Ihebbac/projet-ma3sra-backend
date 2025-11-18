import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AchatController } from './achat.controller';
import { AchatService } from './achat.service';
import { Achat, AchatSchema } from '../schema/achat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Achat.name, schema: AchatSchema }]),
  ],
  controllers: [AchatController],
  providers: [AchatService],
})
export class AchatModule {}