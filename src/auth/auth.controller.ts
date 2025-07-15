import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/login.dto';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

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
  async register(@Body() userData: CreateUserDto): Promise<User> {
    return this.authService.register(userData);
  }
}
