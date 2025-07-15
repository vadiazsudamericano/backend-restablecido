import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Herramienta } from './herramienta.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class HerramientaService {
  constructor(
    @InjectRepository(Herramienta)
    private repo: Repository<Herramienta>
  ) {}

  // GET /herramientas
  findAll(): Promise<Herramienta[]> {
    return this.repo.find();
  }

  // GET /herramientas/:id
  async findById(id: number): Promise<Herramienta> {
  const herramienta = await this.repo.findOne({ where: { id } });
  if (!herramienta) {
    throw new NotFoundException(`Herramienta con id ${id} no encontrada`);
  }
  return herramienta;
}

  // POST /herramientas
  create(data: Partial<Herramienta>): Promise<Herramienta> {
    const nueva = this.repo.create(data);
    return this.repo.save(nueva);
  }
}
