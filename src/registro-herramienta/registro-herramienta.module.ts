import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroHerramienta } from './registro-herramienta.entity';
import { RegistroHerramientaController } from './registro-herramienta.controller';
import { Herramienta } from '../herramienta/herramienta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroHerramienta, Herramienta])],
  controllers: [RegistroHerramientaController],
})
export class RegistroHerramientaModule {}
