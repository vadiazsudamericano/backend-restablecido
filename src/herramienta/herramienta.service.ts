// RUTA: src/herramienta/herramienta.service.ts

import { Injectable, NotFoundException } from '@nestjs/common'; // <-- Importa NotFoundException
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

  // --- FUNCIÓN CORREGIDA #1 ---
  async findById(id: number): Promise<Herramienta> {
    const herramienta = await this.herramientaRepository.findOneBy({ id });

    // Si no se encuentra, lanzamos un error 404.
    if (!herramienta) {
      throw new NotFoundException(`No se encontró la herramienta con el ID: ${id}`);
    }
    // Si se encuentra, la devolvemos. Ahora TypeScript sabe que nunca será null.
    return herramienta;
  }

  // --- FUNCIÓN CORREGIDA #2 ---
  async findByNombre(nombre: string): Promise<Herramienta> {
    const herramienta = await this.herramientaRepository.findOne({ where: { nombre } });

    // Hacemos lo mismo para la búsqueda por nombre.
    if (!herramienta) {
      throw new NotFoundException(`No se encontró la herramienta con el nombre: ${nombre}`);
    }
    // Si llegamos aquí, 'herramienta' es definitivamente una Herramienta, no null.
    return herramienta;
  }
}