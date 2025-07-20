import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../users/dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Correo o contraseña inválidos');
    }

    return this.authService.login(user);
  }

  @Post('register')
async register(@Body() createUserDto: CreateUserDto) {
  return this.authService.register(createUserDto);
}
}
