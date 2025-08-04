import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTemperaturaDto } from './dto/create-temperatura.dto';
import { Temperatura } from './entities/temperatura.entity';

@Injectable()
export class TemperaturaService {
  constructor(
    @InjectRepository(Temperatura)
    private readonly temperaturaRepository: Repository<Temperatura>,
  ) {}

  create(createTemperaturaDto: CreateTemperaturaDto) {
    const nuevaLectura = this.temperaturaRepository.create(createTemperaturaDto);
    return this.temperaturaRepository.save(nuevaLectura);
  }

  findAll() {
    return this.temperaturaRepository.find({
      order: { fechaLectura: 'DESC' },
      take: 20,
    });
  }
}