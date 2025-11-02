import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from './client/clients.module';
import { ProprietairesModule } from './proprietaire/prop.module';
import { FitouraModule } from './fitoura/fitoura.module';
import { EmployeModule } from './employe/employe.module';
import { TransactionsModule } from './transactions/prop.module';
import { CaissesModule } from './caisse/caisse.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { PrinterModule } from './printticket/printer.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ihebbaccouch1999_db_user:zBw4eO4ppBq5XYeq@cluster0.fo8llat.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    AuthModule,
    UsersModule,
    ClientsModule,
    ProprietairesModule,
    FitouraModule,
    EmployeModule,
    TransactionsModule,
    CaissesModule,
  ],
})
export class AppModule {}
