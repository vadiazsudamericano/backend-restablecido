import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors'; // ← CORRECTO

import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // O tu frontend real, por ejemplo: 'https://tu-app.vercel.app'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  const port = process.env.PORT || 8080;
  await app.listen(port);
  console.log(`🚀 Backend escuchando en el puerto ${port}`);
}
bootstrap();
