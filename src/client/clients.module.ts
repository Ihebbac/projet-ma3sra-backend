import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { Client, ClientSchema } from 'src/schema/client.schema';
import { CaisseModule } from 'src/caisse/caisse.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    CaisseModule,
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}