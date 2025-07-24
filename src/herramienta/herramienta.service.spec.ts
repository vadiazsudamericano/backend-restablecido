import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Herramienta } from './herramienta.entity';

@Injectable()
export class HerramientaService {
  constructor(
    @InjectRepository(Herramienta)
    private readonly herramientaRepository: Repository<Herramienta>,
  ) {}

  findAll(): Promise<Herramienta[]> {
    return this.herramientaRepository.find();
  }

  findById(id: number): Promise<Herramienta | null> {
    return this.herramientaRepository.findOneBy({ id });
  }

  findByNombre(nombre: string): Promise<Herramienta | null> {
    return this.herramientaRepository.findOneBy({ nombre });
  }
}
