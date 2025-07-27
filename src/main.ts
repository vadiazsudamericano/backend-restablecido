// RUTA: src/main.ts (LA SOLUCIÓN DEFINITIVA)

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // --- ¡ESTE ES EL ÚNICO CAMBIO QUE NECESITAS! ---
  // Forzamos a la aplicación a escuchar en el puerto 8080,
  // que es el que Railway está exponiendo públicamente.
  await app.listen(8080);
}
bootstrap();