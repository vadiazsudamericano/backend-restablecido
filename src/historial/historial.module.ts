// RUTA: src/historial/historial.module.ts

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Historial } from './entities/historial.entity';
import { HistorialController } from './historial.controller';
import { HistorialService } from './historial.service';
import { HerramientaModule } from '../herramienta/herramienta.module';
import { RegistroHerramienta } from '../registro-herramienta/registro-herramienta.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([RegistroHerramienta]),
    forwardRef(() => HerramientaModule), // <-- Soluciona la dependencia
  ],
  controllers: [HistorialController],
  providers: [HistorialService],
  exports: [TypeOrmModule], // Puedes mantener esto si quieres
})
export class HistorialModule {}