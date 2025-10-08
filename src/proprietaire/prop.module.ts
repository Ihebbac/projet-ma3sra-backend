import { Module } from '@nestjs/common';
import { ProprietairesService } from './prop.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProprietaireSchema } from 'src/schema/prop.schema';
import { ProprietairesController } from './prop.controller';

@Module({
  imports: [ 
    MongooseModule.forFeature([{ name: 'Proprietaire', schema: ProprietaireSchema }])
  ],
  controllers: [ProprietairesController],
  providers: [ProprietairesService],
})
export class ProprietairesModule {}