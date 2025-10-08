import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './apis/users/users.module';
import { CoursesModule } from './apis/courses/courses.module';
import { AuthModule } from './apis/auth/auth.module';
import { CategoryModule } from './apis/category/category.module';
import { RoleModule } from './apis/role/role.module';
import { ClientsModule } from './client/clients.module';
import { ProprietairesModule } from './proprietaire/prop.module';
import { FitouraModule } from './fitoura/fitoura.module';
import { EmployeModule } from './employe/employe.module';
@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://ihebbaccouch1999_db_user:zBw4eO4ppBq5XYeq@cluster0.fo8llat.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"),
    AuthModule,UsersModule,CoursesModule, CategoryModule,RoleModule,ClientsModule,ProprietairesModule,FitouraModule,EmployeModule,
  ]
})
export class AppModule {}
