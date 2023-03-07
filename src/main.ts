import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/modules/app/App.module';
import { useContainer } from 'class-validator';
import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";
import helmet from 'helmet';
// var admin = require("firebase-admin");
var serviceAccount = require("../giisty-5c007-firebase-adminsdk-41spi-6c2655d8b9.json");
require('dotenv').config()


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(helmet());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Giisty apis')
    .setDescription('documentation for giisty apis')
    .setVersion('1.0')
    .addTag('Giisty').addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger/api', app, document);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.APP_PORT);
}
bootstrap();
