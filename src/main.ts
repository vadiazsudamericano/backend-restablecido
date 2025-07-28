import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://tudominio.vercel.app' // cámbialo si ya lo tienes
    ],
    credentials: true
  });

  // Respuesta para la ruta raíz
  app.getHttpAdapter().get('/', (_, res) => {
    res.send('Hola desde el backend en producción 👋');
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
