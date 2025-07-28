import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Habilitar CORS para permitir llamadas desde tu frontend en Vercel o localhost
  app.enableCors({
    origin: [
      'http://localhost:4200', // Desarrollo local
      'https://tudominio.vercel.app', // ← cámbialo por el dominio real cuando lo tengas
    ],
    credentials: true, // Si usas cookies o headers personalizados
  });

  // ✅ Ruta raíz para confirmar que está corriendo en producción
  app.getHttpAdapter().get('/', (_, res) => {
    res.send('Hola desde el backend en producción 👋');
  });

  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 Backend escuchando en el puerto ${process.env.PORT || 3000}`);
}
bootstrap();
