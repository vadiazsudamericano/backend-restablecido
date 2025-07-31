// RUTA: src/historial/historial.service.ts
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Historial } from './entities/historial.entity';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { User } from '../users/user.entity';

@Injectable()
export class HistorialService {
  constructor(
    @InjectRepository(Historial)
    private historialRepository: Repository<Historial>,
    @InjectRepository(User)
    private userRepository: Repository<User>,  // ✅ Repositorio de User
  ) {}

  async create(data: CreateHistorialDto, userId: number) {
    try {
      console.log('✅ [HistorialService.create] Datos recibidos:', data);
      console.log('🧍‍♂️ userId recibido:', userId);

      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) throw new NotFoundException('Usuario no encontrado');

      const historial = this.historialRepository.create({
        herramientaId: data.herramientaId,
        user: user, // ✅ Relación correcta
        referenciaVisual: data.referenciaVisual,
      });

      console.log('📦 Objeto a guardar:', historial);
      const resultado = await this.historialRepository.save(historial);
      console.log('✅ Historial guardado exitosamente:', resultado);

      return resultado;
    } catch (error: any) {
      console.error('❌ Error al crear historial:', error);
      throw new InternalServerErrorException('Error al guardar historial');
    }
  }

  async findByUserId(userId: number): Promise<Historial[]> {
    try {
      return await this.historialRepository.find({
        where: { user: { id: userId } },
        relations: ['user'],
      });
    } catch (error) {
      console.error('❌ Error en findByUserId:', error);
      throw new InternalServerErrorException('Error al obtener historial');
    }
  }
}
