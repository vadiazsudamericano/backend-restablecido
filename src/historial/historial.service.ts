import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Historial } from './entities/historial.entity';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { User } from '../users/user.entity';
import { Herramienta } from '../herramienta/herramienta.entity';

@Injectable()
export class HistorialService {
  constructor(
    @InjectRepository(Historial)
    private historialRepository: Repository<Historial>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Herramienta)
    private herramientaRepository: Repository<Herramienta>,
  ) {}

  async create(data: CreateHistorialDto, userId: number) {
    try {
      console.log('✅ [HistorialService.create] Datos recibidos:', data);
      console.log('🧍‍♂️ userId recibido:', userId);

      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) throw new NotFoundException('Usuario no encontrado');

      const herramienta = await this.herramientaRepository.findOneBy({
        id: data.herramientaId,
      });
      if (!herramienta) throw new NotFoundException('Herramienta no encontrada');

      const historial = this.historialRepository.create({
        herramienta,
        user,
        referenciaVisual: data.referencia_visual,
      });

      const resultado = await this.historialRepository.save(historial);
      console.log('✅ Historial guardado exitosamente:', resultado);

      return resultado;
    } catch (error) {
      console.error('❌ Error al crear historial:', error);
      throw new InternalServerErrorException('Error al guardar historial');
    }
  }

  async findByUserId(userId: number): Promise<Historial[]> {
    try {
      return await this.historialRepository.find({
        where: { user: { id: userId } },
        relations: ['user', 'herramienta'],
        order: { fecha: 'DESC' },
      });
    } catch (error) {
      console.error('❌ Error en findByUserId:', error);
      throw new InternalServerErrorException('Error al obtener historial');
    }
  }
}
