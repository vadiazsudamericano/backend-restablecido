import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroHerramienta } from './registro-herramienta.entity';
import { RegistroHerramientaService } from './registro-herramienta.service';
import { RegistroHerramientaController } from './registro-herramienta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroHerramienta])],
  providers: [RegistroHerramientaService],
  controllers: [RegistroHerramientaController],
})
export class RegistroModule {}
