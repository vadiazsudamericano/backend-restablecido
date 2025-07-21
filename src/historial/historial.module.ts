// RUTA: src/historial/historial.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Historial } from './entities/historial.entity';
import { HistorialService } from './historial.service';
import { HistorialController } from './historial.controller';
// --- ¡ESTA ES LA LÍNEA CORREGIDA! ---
// Desde la carpeta 'historial', subimos un nivel (a 'src')
// y luego bajamos a 'herramienta'.
import { HerramientaModule } from '../herramienta/herramienta.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Historial]),
    HerramientaModule,
  ],
  providers: [HistorialService],
  controllers: [HistorialController],
})
export class HistorialModule {}