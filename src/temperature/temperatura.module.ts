import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemperaturaService } from './temperatura.service';
import { TemperaturaController } from './temperatura.controller';
import { Temperatura } from './entities/temperatura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Temperatura])],
  controllers: [TemperaturaController],
  providers: [TemperaturaService],
})
export class TemperaturaModule {}