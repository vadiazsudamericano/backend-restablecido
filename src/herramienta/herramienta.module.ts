import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Herramienta } from './herramienta.entity';
import { HerramientaService } from './herramienta.service';
import { HerramientaController } from './herramienta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Herramienta])],
  providers: [HerramientaService],
  controllers: [HerramientaController],
  exports: [HerramientaService],
})
export class HerramientaModule {}
