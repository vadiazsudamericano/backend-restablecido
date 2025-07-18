import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { dataSource } from './ormconfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*try {
    const dataSourceInstance: DataSource = dataSource;
    await dataSourceInstance.initialize();
    await dataSourceInstance.runMigrations();
    console.log('✅ Base de datos conectada y migraciones aplicadas');
  } catch (err) {
    console.error('❌ Error conectando a la base de datos:', err);
  }*/

  app.enableCors({
    origin: ['http://localhost:4200', 'https://medicleanfrontend-yf39.vercel.app/'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Servidor escuchando en el puerto ${port}`);
}
bootstrap();
