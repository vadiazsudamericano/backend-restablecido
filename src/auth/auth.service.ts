import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string | undefined, pass: string) {
  if (!email) return null;

  const user = await this.usersService.findOneByEmailWithPassword(email);
  if (!user || !user.password) return null;

  const isMatch = await bcrypt.compare(pass, user.password);
  if (isMatch) {
    const { password, ...result } = user;
    return result;
  }

  return null;
}


  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      nombre: user.nombre,
      apellido: user.apellido,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async register(createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
}
