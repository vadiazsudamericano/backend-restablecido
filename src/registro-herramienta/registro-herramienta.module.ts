// RUTA: src/registro-herramienta/registro-herramienta.module.ts

import { Module, forwardRef } from '@nestjs/common'; // <-- ¡IMPORTANTE!
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroHerramienta } from './registro-herramienta.entity';
// ... otros imports del servicio y controlador
import { HerramientaModule } from '../herramienta/herramienta.module'; // <-- ¡IMPORTANTE!

@Module({
  // --- APLICA ESTE CAMBIO ---
  imports: [
    TypeOrmModule.forFeature([RegistroHerramienta]),
    forwardRef(() => HerramientaModule), // <-- Rompe la dependencia circular
  ],
  // -------------------------
  providers: [/* ... */],
  controllers: [/* ... */],
  exports: [TypeOrmModule]
})
export class RegistroHerramientaModule {}