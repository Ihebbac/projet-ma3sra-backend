import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CaisseController } from './caisse.controller';
import { CaisseService } from './caisse.service';
import { CaisseNotificationsService } from './caisse-notifications.service';
import { Caisse, CaisseSchema } from 'src/schema/caisse.schema';
import {
  CaisseNotification,
  CaisseNotificationSchema,
} from 'src/schema/caisse-notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Caisse.name, schema: CaisseSchema },
      { name: CaisseNotification.name, schema: CaisseNotificationSchema },
    ]),
  ],
  controllers: [CaisseController],
  providers: [CaisseService, CaisseNotificationsService],
  exports: [CaisseService, CaisseNotificationsService],
})
export class CaisseModule {}