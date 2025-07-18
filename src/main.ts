import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { dataSource } from './ormconfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    const dataSourceInstance: DataSource = dataSource;
    await dataSourceInstance.initialize();
    await dataSourceInstance.runMigrations();
    console.log('📦 Migraciones ejecutadas correctamente');
  } catch (err) {
    console.error('❌ Error al ejecutar migraciones:', err.message);
  }

  app.enableCors({
    origin: ['http://localhost:4200', 'https://medicleanfrontend-yf39.vercel.app/'],
    credentials: true,
  });

  // ✅ Activa la validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  await app.listen(parseInt(process.env.PORT || '3000'));

  console.log(`🚀 App escuchando en puerto ${process.env.PORT || 8080}`);
}
bootstrap();
