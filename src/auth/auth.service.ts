// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from 'src/users/dto/login.dto';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt'; // Importa bcrypt
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Método para registrar un nuevo usuario
  async register(createUserDto: CreateUserDto) {
  const { email, password, role } = createUserDto;

  // Encriptar la contraseña antes de guardarla
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await this.usersService.create({
    email,
    password: hashedPassword,
    role,
  });

  return user;
  }

  // Método para validar las credenciales
  async validateUser(email: string, password: string): Promise<User | null> {
  const user = await this.usersService.findOneByEmail(email);

  if (!user || !user.password) {
    console.warn('Usuario no encontrado o sin contraseña');
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    return user;
  }

  return null;
}


  // Método para generar el token JWT
  async login(user: User) {
    const payload = { email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
