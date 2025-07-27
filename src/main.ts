// RUTA: src/main.ts (VERSIÓN DE DIAGNÓSTICO)

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('--- [Paso 1] Iniciando la función bootstrap ---');
  const app = await NestFactory.create(AppModule);
  console.log('--- [Paso 2] Aplicación Nest creada con éxito ---');

  app.enableCors();

  const PORT = process.env.PORT || 3000;
  console.log(`--- [Paso 3] Intentando escuchar en el puerto ${PORT} en 0.0.0.0 ---`);

  await app.listen(PORT, '0.0.0.0');

  console.log(`--- [Paso 4] ¡ÉXITO! La aplicación está escuchando en el puerto ${PORT} ---`);
}
bootstrap();