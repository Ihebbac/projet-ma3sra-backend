import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeService } from './employe.service';
import { EmployeController } from './employe.controller';
import { Employe, EmployeSchema } from '../schema/employe.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Employe.name, schema: EmployeSchema }])],
  controllers: [EmployeController],
  providers: [EmployeService],
})
export class EmployeModule {}
