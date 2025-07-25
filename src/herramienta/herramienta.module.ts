// RUTA: src/herramienta/herramienta.module.ts

import { Module, forwardRef } from '@nestjs/common'; // <-- ¡IMPORTANTE!
import { TypeOrmModule } from '@nestjs/typeorm';
import { Herramienta } from './herramienta.entity';
import { HerramientaService } from './herramienta.service';
import { HerramientaController } from './herramienta.controller';
import { RegistroHerramientaModule } from '../registro-herramienta/registro-herramienta.module'; // <-- ¡IMPORTANTE!

@Module({
  // --- APLICA ESTE CAMBIO ---
  imports: [
    TypeOrmModule.forFeature([Herramienta]),
    forwardRef(() => RegistroHerramientaModule), // <-- Rompe la dependencia circular
  ],
  // -------------------------
  providers: [HerramientaService],
  controllers: [HerramientaController],
  exports: [TypeOrmModule] // Puedes dejar o quitar esto, lo importante es forwardRef
})
export class HerramientaModule {}