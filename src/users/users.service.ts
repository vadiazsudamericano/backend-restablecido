import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../auth/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepo.findOne({ where: { email: data.email } });
    const roleValue: Role = (data.role as Role) || Role.User;

    if (existingUser) {
      console.log(`🔄 Usuario existente (${data.email}). Actualizando contraseña...`);
      const hashedPassword = await bcrypt.hash(data.password, 10);
      await this.userRepo.update(existingUser.id, {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        password: hashedPassword,
        role: roleValue,
      });
      const updated = await this.userRepo.findOne({ where: { id: existingUser.id } });
      if (!updated) throw new NotFoundException('Usuario actualizado no encontrado');
      return updated;
    }

    console.log(`🆕 Usuario nuevo (${data.email}). Creando...`);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = this.userRepo.create({
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      password: hashedPassword,
      role: roleValue,
    });
    return this.userRepo.save(user);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepo.findOne({ where: { email } }) ?? undefined;
  }

  async findById(id: number): Promise<User | undefined> {
    return await this.userRepo.findOne({ where: { id } }) ?? undefined;
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOneByEmailWithPassword(email: string): Promise<User | undefined> {
    return await this.userRepo
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect(['user.password', 'user.role'])
      .getOne() ?? undefined;
  }

  async remove(id: number): Promise<{ message: string }> {
    const userToRemove = await this.userRepo.findOne({ where: { id } });
    if (!userToRemove) {
      throw new NotFoundException(`Usuario con ID #${id} no encontrado.`);
    }
    await this.userRepo.remove(userToRemove);
    return { message: `Usuario con ID #${id} eliminado con éxito.` };
  }

  async findOne(id: number): Promise<User | undefined> {
    return await this.userRepo.findOne({ where: { id } }) ?? undefined;
  }

  async updateRole(id: number, role: string) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    if (!Object.values(Role).includes(role as Role)) {
      throw new BadRequestException(`Rol inválido. Debe ser uno de: ${Object.values(Role).join(', ')}`);
    }

    user.role = role as Role;
    return this.userRepo.save(user);
  }
}
