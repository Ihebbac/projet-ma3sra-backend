import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { CaisseSchema } from 'src/schema/Caisse.schema';
import { CaisseController } from './caisse.controller';
import { CaisseService } from './caisse.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Caisse', schema: CaisseSchema }]),
  ],
  controllers: [CaisseController],
  providers: [CaisseService],
})
export class CaissesModule {}
