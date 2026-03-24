import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    },
  });

  const uploadsRoot = join(process.cwd(), 'uploads');
  const fitouraUploads = join(uploadsRoot, 'fitoura');

  if (!fs.existsSync(uploadsRoot)) {
    fs.mkdirSync(uploadsRoot);
  }

  if (!fs.existsSync(fitouraUploads)) {
    fs.mkdirSync(fitouraUploads);
  }

  app.useStaticAssets(uploadsRoot, {
    prefix: '/uploads',
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('ma3sra')
    .setDescription('ma3sra API COllection')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8170);
}
bootstrap();