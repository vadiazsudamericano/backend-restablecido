import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS manual (si quieres permitir desde todos los orígenes)
  app.enableCors({
    origin: '*', // o pon tu frontend: 'https://tu-app.vercel.app'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // Puerto dinámico para Railway
  const port = process.env.PORT || 8080;
  await app.listen(port);
  console.log(`🚀 Backend escuchando en el puerto ${port}`);
}
bootstrap();
