// RUTA: src/main.ts
if (typeof globalThis.crypto === 'undefined') {
  const crypto = require('crypto');
  
  // Crear un polyfill más completo
  globalThis.crypto = {
    randomUUID: crypto.randomUUID?.bind(crypto) || (() => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }),
    getRandomValues: (array: any) => {
      return crypto.randomFillSync(array);
    },
    subtle: {} as SubtleCrypto // Placeholder para subtle crypto
  } as Crypto;
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// ... resto de tus importaciones

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: [
      'http://localhost:4200',
      'https://localhost:4200',
      process.env.FRONTEND_URL, // <-- AÑADE ESTA LÍNEA
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  
  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe());
await app.listen(process.env.PORT || 3000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();