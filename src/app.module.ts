// RUTA: src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Módulos
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HerramientaModule } from './herramienta/herramienta.module';
import { HistorialModule } from './historial/historial.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Historial } from './historial/entities/historial.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      
      // La mejor práctica es la auto-detección de entidades
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      
      // Pon esto en 'true' para que NestJS cree la tabla 'historial' que falta.
      // Una vez que la tabla esté creada, puedes volver a ponerlo en 'false'.
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    HerramientaModule,
    HistorialModule, // Este ya estaba bien
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}