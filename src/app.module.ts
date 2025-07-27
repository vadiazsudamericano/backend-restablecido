// RUTA: src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'; // <-- 1. IMPORTA TypeOrmModuleOptions
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Módulos personalizados
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HerramientaModule } from './herramienta/herramienta.module';
import { HistorialModule } from './historial/historial.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // --- 2. AÑADE EL TIPO DE RETORNO AQUÍ ---
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const isProduction = configService.get<string>('NODE_ENV') === 'production';
        
        return {
          type: 'postgres',
          host: configService.get<string>('PGHOST')!,
          port: parseInt(configService.get<string>('PGPORT')!, 10),
          username: configService.get<string>('PGUSER')!,
          password: configService.get<string>('PGPASSWORD')!,
          database: configService.get<string>('PGDATABASE')!,
          
          ssl: isProduction ? { rejectUnauthorized: false } : false,
            
          entities: [__dirname + '/**/*.entity{.js,.ts}'], 
          
          synchronize: true, 
        };
      },
    }),

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