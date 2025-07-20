import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Módulos propios
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Entidades
import { User } from './users/user.entity';
import { HerramientaModule } from './herramienta/herramienta.module';
import { Herramienta } from './herramienta/herramienta.entity';
import { RegistroHerramienta } from './registro-herramienta/registro-herramienta.entity';
import { Photo } from './gallery/photo.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles en toda la app
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Herramienta, RegistroHerramienta, Photo],
      synchronize: false, // Cambia a false en producción si usas migraciones
    }),
    AuthModule,
    UsersModule,
    HerramientaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
