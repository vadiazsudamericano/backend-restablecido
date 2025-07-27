// RUTA: src/app.module.ts (VERSIÓN DE AISLAMIENTO)

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Temporalmente hemos quitado los módulos que dependen de la base de datos
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { HerramientaModule } from './herramienta/herramienta.module';
// import { HistorialModule } from './historial/historial.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // ====================================================================
    // === HEMOS COMENTADO TEMPORALMENTE LA CONEXIÓN A LA BASE DE DATOS ===
    // ====================================================================
    // TypeOrmModule.forRootAsync({ ... }),
    // ====================================================================

    // También comentamos los módulos que necesitan la base de datos para arrancar
    // AuthModule,
    // UsersModule,
    // HerramientaModule,
    // HistorialModule,
  ],
  controllers: [AppController], // Dejamos solo el AppController básico
  providers: [AppService],   // Dejamos solo el AppService básico
})
export class AppModule {}