import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from 'src/users/dto/login.dto';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Método para registrar un nuevo usuario
  async register(createUserDto: CreateUserDto) {
    const { email, password, nombre } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      nombre, // usamos el campo correcto del DTO
    });

    return user;
  }

  // Validar las credenciales
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user || !user.password) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }

  // Generar JWT sin rol
  async login(user: User) {
    const payload = { email: user.email, sub: user.id }; // sub estándar en JWT
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
