import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para frontend local y en Vercel
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://mediclean.vercel.app' // cambia si tu frontend tiene otro dominio
    ],
    credentials: true,
  });

  // Ruta raíz de prueba
  app.getHttpAdapter().get('/', (req: Request, res: Response) => {
    res.send('Hola desde el backend en producción 👋');
  });

  const PORT = process.env.PORT || 8080;
  await app.listen(PORT);
  console.log(`🚀 Backend escuchando en el puerto ${PORT}`);
}
bootstrap();
