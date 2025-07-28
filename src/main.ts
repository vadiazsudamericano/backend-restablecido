import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import cors from 'cors';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activar CORS globalmente
  app.use(cors());

  // Puerto dinámico para producción (Railway) o 8080 en local
  const PORT = process.env.PORT || 8080;

  await app.listen(PORT);
  Logger.log(`🚀 Backend escuchando en el puerto ${PORT}`);
}
bootstrap();
