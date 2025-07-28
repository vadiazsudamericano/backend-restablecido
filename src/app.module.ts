import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  useFactory: (config: ConfigService): TypeOrmModuleOptions => {
    const isProduction = config.get('NODE_ENV') === 'production';
    const localUrl = `postgresql://${config.get('PGUSER')}:${config.get('PGPASSWORD')}@${config.get('PGHOST')}:${config.get('PGPORT')}/${config.get('PGDATABASE')}`;

    return {
      type: 'postgres',
      url: isProduction ? config.get('DATABASE_URL') : localUrl,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],

      // --- ¡AÑADE ESTAS DOS LÍNEAS TEMPORALMENTE! ---
      dropSchema: true,
      synchronize: true,
      // -------------------------------------------------
      
      ssl: {
        rejectUnauthorized: false,
      },
    };
  },
}),

    AuthModule,
    UsersModule,
    HerramientaModule,
    HistorialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}