// RUTA: src/herramienta/herramienta.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findById(id: number): Promise<Herramienta> {
    const herramienta = await this.herramientaRepository.findOneBy({ id });
    if (!herramienta) {
      throw new NotFoundException(`No se encontró la herramienta con el ID: ${id}`);
    }
    return herramienta;
  }

  async findByNombre(nombre: string): Promise<Herramienta> {
    const herramienta = await this.herramientaRepository.findOne({ where: { nombre } });
    // El controlador se encargará de lanzar la excepción si este método devuelve null.
    return herramienta;
  }
}