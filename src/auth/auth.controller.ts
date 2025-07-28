// RUTA: src/auth/auth.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../users/dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
async login(@Body() body: { email: string; password: string }) {
  const { email, password } = body;

  const user = await this.authService.validateUser(email, password);

  if (!user) {
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  // ✅ Solo pasamos el objeto `user` como argumento
  return this.authService.login(user);
}



  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req: ExpressRequest) {
    return req.user;
  }
}
