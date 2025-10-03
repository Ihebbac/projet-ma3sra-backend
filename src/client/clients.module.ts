import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ClientSchema } from 'src/schema/client.schema';
import { ClientsController } from './clients.controller';

@Module({
  imports: [ MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
