// RUTA: src/historial/historial.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Historial } from './entities/historial.entity';
import { HistorialController } from './historial.controller';
import { HistorialService } from './historial.service';
import { HerramientaModule } from '../herramienta/herramienta.module';
import { RegistroHerramienta } from '../registro-herramienta/registro-herramienta.entity';
import { User } from '../users/user.entity'; // ✅ importa User
import { UsersModule } from '../users/users.module'; // ✅ importa UsersModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Historial, User]), // ✅ incluye ambas entidades
    forwardRef(() => HerramientaModule),
    forwardRef(() => UsersModule), // ✅ permite inyectar UsersService o UserRepository
  ],
  controllers: [HistorialController],
  providers: [HistorialService],
  exports: [TypeOrmModule],
})
export class HistorialModule {}
