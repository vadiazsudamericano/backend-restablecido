import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Herramienta } from './herramienta.entity';
import { CrearHerramientaDto } from './dto/crear-herramienta.dto';
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
    return this.herramientaRepository.findOneBy({ id }); // ✅ uso correcto del repo
  }

  findByNombre(nombre: string): Promise<Herramienta | null> {
    return this.herramientaRepository.findOneBy({ nombre }); // ✅ sin error de tipo
  }
  async crear(dto: CrearHerramientaDto): Promise<Herramienta> {
  try {
    console.log('[DTO recibido]', dto);

    const herramienta = this.herramientaRepository.create(dto);
    return await this.herramientaRepository.save(herramienta);
  } catch (error) {
    console.error('[ERROR al guardar herramienta]', error);
    throw error; // vuelve a lanzar para que el cliente lo vea
  }
}
}
