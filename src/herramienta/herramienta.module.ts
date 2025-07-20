// RUTA: src/herramienta/herramienta.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Herramienta } from './herramienta.entity';
import { HerramientaService } from './herramienta.service';
import { HerramientaController } from './herramienta.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Herramienta])
  ],
  providers: [
    HerramientaService
  ],
  controllers: [
    // Esta línea es crucial para que las rutas del controlador sean reconocidas.
    HerramientaController
  ],
})
export class HerramientaModule {}