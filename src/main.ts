// RUTA: src/main.ts (en tu proyecto de NestJS)

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // --- CAMBIO CLAVE AQUÍ ---
    // En lugar de una sola cadena, pasamos un array con todos los orígenes permitidos.
    origin: [
      'http://localhost:4200',  // Origen HTTP (para desarrollo normal)
      'https://localhost:4200'  // Origen HTTPS (para usar la cámara)
    ],
    // -------------------------
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  // Escucha en el puerto definido por la plataforma (Render, Railway)
  await app.listen(process.env.PORT || 3000);
}
bootstrap();