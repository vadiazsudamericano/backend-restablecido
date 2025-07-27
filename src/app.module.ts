// RUTA: src/app.module.ts (VERSIÓN FINAL Y FUNCIONAL)

import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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

    // --- ESTA ES LA CONFIGURACIÓN CORRECTA Y A PRUEBA DE FALLOS ---
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const isProduction = configService.get<string>('NODE_ENV') === 'production';
        
        return {
          type: 'postgres',
          // Construimos la conexión manualmente a partir de las variables
          host: configService.get<string>('PGHOST')!,
          port: parseInt(configService.get<string>('PGPORT')!, 10),
          username: configService.get<string>('PGUSER')!,
          password: configService.get<string>('PGPASSWORD')!,
          database: configService.get<string>('PGDATABASE')!,
          
          // La configuración SSL es crucial para producción
          ssl: isProduction ? { rejectUnauthorized: false } : false,
            
          // Le decimos dónde encontrar los archivos .js compilados
          entities: [__dirname + '/**/*.entity.js'], 
          
          // Sincroniza las tablas (perfecto para desarrollo y este proyecto)
          synchronize: true, 
        };
      },
    }),
    // --- FIN DE LA CONFIGURACIÓN DE TYPEORM ---

    // Volvemos a activar los módulos de nuestra aplicación
    AuthModule,
    UsersModule,
    HerramientaModule,
    HistorialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}