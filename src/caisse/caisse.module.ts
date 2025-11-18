import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { CaisseController } from './caisse.controller';
import { CaisseService } from './caisse.service';
import { CaisseSchema } from 'src/schema/caisse.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Caisse', schema: CaisseSchema }]),
  ],
  controllers: [CaisseController],
  providers: [CaisseService],
})
export class CaissesModule {}
