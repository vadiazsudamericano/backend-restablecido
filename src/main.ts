import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 App escuchando en puerto ${process.env.PORT || 3000}`);
}
bootstrap();
