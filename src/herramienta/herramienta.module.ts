// src/herramienta/herramienta.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Herramienta } from './herramienta.entity';
import { HerramientaService } from './herramienta.service';
import { HerramientaController } from './herramienta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Herramienta])],
  controllers: [HerramientaController],
  providers: [HerramientaService],
  exports: [TypeOrmModule],
})
export class HerramientaModule {}
