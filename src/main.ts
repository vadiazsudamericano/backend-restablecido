// Polyfill para globalThis.crypto (Railway lo necesita a veces)
if (typeof globalThis.crypto === 'undefined') {
  const crypto = require('crypto');

  globalThis.crypto = {
    randomUUID: crypto.randomUUID?.bind(crypto) || (() => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }),
    getRandomValues: (array: any) => crypto.randomFillSync(array),
    subtle: {} as SubtleCrypto, // no usado pero requerido por algunas libs
  } as Crypto;
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://localhost:4200',
      process.env.FRONTEND_URL || '', // Acepta frontend desde variable de entorno
    ].filter(Boolean), // Elimina strings vacíos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3000;
await app.listen(port, '0.0.0.0');
console.log(`✅ App corriendo en: http://0.0.0.0:${port}`);

}
bootstrap();
