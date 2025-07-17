import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm'; // 👈 Importa el DataSource

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🟢 Ejecutar migraciones automáticamente
  const dataSource = app.get(DataSource);
  await dataSource.runMigrations();

  // CORS
  app.enableCors({
    origin: ['http://localhost:4200', 'https://medicleanfrontend-yf39.vercel.app/'],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
