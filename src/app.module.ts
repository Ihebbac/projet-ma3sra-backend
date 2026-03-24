import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from './client/clients.module';
import { ProprietairesModule } from './proprietaire/prop.module';
import { FitouraModule } from './fitoura/fitoura.module';
import { EmployeModule } from './employe/employe.module';
import { TransactionsModule } from './transactions/prop.module';
import { CaisseModule } from './caisse/caisse.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AchatModule } from './achat/achat.module';
import { AchatBaseModule } from './achat-base/achat-base.module';
// import { PrinterModule } from './printticket/printer.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ihebbaccouch1999_db_user:MxD8T4SmyMA5rYwM@cluster1.1btl2fd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1',
    ),
    AuthModule,
    UsersModule,
    ClientsModule,
    ProprietairesModule,
    FitouraModule,
    EmployeModule,
    TransactionsModule,
    CaisseModule,
    AchatModule,
    AchatBaseModule,
  ],
})
export class AppModule {}