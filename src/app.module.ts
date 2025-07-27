// RUTA: src/app.module.ts (VERSIÓN DE DIAGNÓSTICO CON CREDENCIALES HARDCODEADAS)

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // Mantenemos ConfigModule por si otros módulos lo usan
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Re-importamos los módulos de nuestra aplicación
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HerramientaModule } from './herramienta/herramienta.module';
import { HistorialModule } from './historial/historial.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // ====================================================================
    // === ¡PRUEBA DE DIAGNÓSTICO DEFINITIVA! ===
    // Hemos reemplazado la configuración dinámica por una fija con tus datos.
    // ====================================================================
    TypeOrmModule.forRoot({
      type: 'postgres',
      
      // --- REEMPLAZA ESTOS VALORES CON TUS DATOS REALES DE RAILWAY ---
      host: 'postgres.railway.internal',                 // Ej: 'postgres.railway.internal'
      port: 5432,                          // El puerto INTERNO, normalmente 5432
      username: 'postgres',               // Ej: 'postgres'
      password: 'lKbtGWYLkSwKlGXGvQoGLwPLSxHyZUWr',           // La contraseña larga de Railway
      database: 'railway',           // Ej: 'railway'
      // -----------------------------------------------------------------

      // La configuración SSL sigue siendo crucial
      ssl: {
        rejectUnauthorized: false,
      },
        
      entities: [__dirname + '/**/*.entity.js'], 
      
      synchronize: true, 
    }),
    // ====================================================================

    // Módulos de la app
    AuthModule,
    UsersModule,
    HerramientaModule,
    HistorialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}