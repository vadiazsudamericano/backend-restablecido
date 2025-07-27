// RUTA: src/users/users.service.ts

import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../auth/enums/role.enum';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /**
   * Crea un nuevo usuario o actualiza la contraseña si el email ya existe.
   * Ideal para desarrollo y para restablecer contraseñas olvidadas.
   * @param data - DTO con los datos del usuario a crear o actualizar.
   * @returns El usuario creado o actualizado.
   */
  async create(data: CreateUserDto): Promise< User | null > {
    // 1. Buscamos si ya existe un usuario con ese email.
    const existingUser = await this.userRepo.findOne({ where: { email: data.email } });

    // 2. Si el usuario ya existe, actualizamos su contraseña.
    if (existingUser) {
      console.log(`Usuario encontrado (${data.email}). Actualizando contraseña...`);
      // Hasheamos la nueva contraseña que viene en el DTO.
      const hashedPassword = await bcrypt.hash(data.password, 10);
      // Actualizamos solo la contraseña y cualquier otro dato que venga.
      await this.userRepo.update(existingUser.id, { 
        ...data, // Esto actualizará nombre y apellido si han cambiado
        password: hashedPassword 
      });
      // Devolvemos el usuario actualizado (sin la contraseña).
      return this.userRepo.findOne({ where: { id: existingUser.id } });
    }

    // 3. Si el usuario NO existe, lo creamos como un nuevo registro.
    console.log(`Usuario nuevo (${data.email}). Creando...`);
    // Hasheamos la contraseña antes de crear.
    const hashedPassword = await bcrypt.hash(data.password, 10);
    // Creamos la nueva entidad de usuario con la contraseña ya hasheada.
    const user = this.userRepo.create({ ...data, password: hashedPassword, role: Role.User, });
    // Guardamos el nuevo usuario en la base de datos.
    return this.userRepo.save(user);
  }

  /**
   * Busca un usuario por su email.
   * Por defecto, no devuelve la contraseña.
   * @param email - El email del usuario a buscar.
   * @returns El usuario encontrado o undefined.
   */
  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepo.findOne({ where: { email } });
    return user ?? undefined;
  }

  /**
   * Busca un usuario por su ID.
   * @param id - El ID del usuario a buscar.
   * @returns El usuario encontrado o undefined.
   */
  async findById(id: number): Promise<User | undefined> {
    const user = await this.userRepo.findOne({ where: { id } });
    return user ?? undefined;
  }
  
  /**
   * Devuelve una lista de todos los usuarios.
   * Por defecto, no devuelve las contraseñas.
   * @returns Un array de todos los usuarios.
   */
  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  /**
   * Busca un usuario por email y explícitamente pide que se incluya la contraseña.
   * Este método solo debe ser usado por el AuthService para la validación del login.
   * @param email - El email del usuario.
   * @returns El usuario con su contraseña hasheada o undefined.
   */
  async findOneByEmailWithPassword(email: string): Promise<User | null> {
    return this.userRepo
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password') // Le dice a TypeORM que incluya la contraseña en esta consulta específica.
      .getOne();
  }
  async remove(id: number): Promise<{ message: string }> {
    const userToRemove = await this.userRepo.findOne({ where: { id } });
    if (!userToRemove) {
      throw new NotFoundException(`Usuario con ID #${id} no encontrado.`);
    }
    await this.userRepo.remove(userToRemove);
    return { message: `Usuario con ID #${id} eliminado con éxito.` };
  }
  async findOne(id: number) {
  return this.userRepo.findOne({ where: { id } });
}
}