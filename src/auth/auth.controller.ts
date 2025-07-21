// RUTA: src/auth/auth.controller.ts

import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../users/dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport'; // Asegúrate de que AuthGuard esté importado
import { Request as ExpressRequest } from 'express';
import { get } from 'https';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Este método es para el login. No necesita cambios.
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      // Manejo de error si las credenciales son incorrectas
      throw new Error('Credenciales inválidas');
    }
    return this.authService.login(user);
  }

  // Este método es para el registro. No necesita cambios.
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  // --- ¡ESTE ES EL NUEVO MÉTODO QUE AÑADIMOS! ---
  // @UseGuards activa el "guardia" que protege esta ruta.
  // Solo las peticiones que incluyan un JWT válido en la cabecera 'Authorization' podrán acceder.
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req: ExpressRequest) {
    return req.user;
  }
}