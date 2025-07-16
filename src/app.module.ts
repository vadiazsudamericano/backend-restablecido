import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller'; // Importa los que faltan
import { AppService } from './app.service';     // Importa los que faltan

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Es una buena práctica hacerlo global para no re-importar
    }),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false, // En desarrollo está bien
    }),

    // --- ¡AQUÍ ESTÁ LA CORRECCIÓN CLAVE! ---
    // Registra tus módulos aquí para que la aplicación los reconozca.
    AuthModule,
    UsersModule,
  ],
  
  // Es una buena práctica mantener el controlador y servicio raíz si existen
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}