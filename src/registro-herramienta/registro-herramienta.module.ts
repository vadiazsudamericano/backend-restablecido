import { Module } from '@nestjs/common';
import { RegistroHerramientaController } from './registro-herramienta.controller';
import { RegistroHerramientaService } from './registro-herramienta.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroHerramienta } from './registro-herramienta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroHerramienta])],
  controllers: [RegistroHerramientaController],
  providers: [RegistroHerramientaService],
})
export class RegistroHerramientaModule {} // <- asegúrate que existe y está exportado
