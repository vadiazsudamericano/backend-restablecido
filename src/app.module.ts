// RUTA: src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get<string>('NODE_ENV') === 'production';
        
        return {
          type: 'postgres',
          // Añadimos '!' para asegurar a TypeScript que estas variables existirán
          host: configService.get<string>('PGHOST')!,
          port: parseInt(configService.get<string>('PGPORT')!, 10),
          username: configService.get<string>('PGUSER')!,
          password: configService.get<string>('PGPASSWORD')!,
          database: configService.get<string>('PGDATABASE')!,
          
          ssl: isProduction ? { rejectUnauthorized: false } : false,
            
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
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