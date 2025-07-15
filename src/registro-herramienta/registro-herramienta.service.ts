import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroHerramienta } from './registro-herramienta.entity';

@Injectable()
export class RegistroHerramientaService {
  constructor(
    @InjectRepository(RegistroHerramienta)
    private repo: Repository<RegistroHerramienta>
  ) {}

  create(data: Partial<RegistroHerramienta>) {
    const registro = this.repo.create(data);
    return this.repo.save(registro);
  }

  async findAll(): Promise<RegistroHerramienta[]> {
    return this.repo.find({
      relations: ['herramienta'],
      order: { fecha: 'DESC' }
    });
  }

  findByHerramienta(id: number) {
    return this.repo.find({
      where: { herramienta: { id } },
      relations: ['herramienta'],
    });
  }
}
