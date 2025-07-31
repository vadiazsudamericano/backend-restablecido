import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilita CORS directamente
  app.enableCors({
    origin: '*', // O especifica tu frontend: 'https://tu-app.vercel.app'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  const port = process.env.PORT || 8080;
  await app.listen(8080);
  console.log(`🚀 Backend escuchando en el puerto ${port}`);
}
bootstrap();
