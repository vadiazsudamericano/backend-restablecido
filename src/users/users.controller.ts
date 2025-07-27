// RUTA: src/users/users.controller.ts

import { Controller, Post, Body, Get, UseGuards, Delete, Request, NotFoundException, UnauthorizedException } from '@nestjs/common'; // <-- 1. Importa UnauthorizedException
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { Param } from '@nestjs/common';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    if (!user) {
      throw new NotFoundException('No se pudo crear o encontrar el usuario.');
    }
    const { password, ...result } = user;
    return result;
  }

  // ===============================================
  // === ¡ESTE ES EL ÚNICO CAMBIO QUE NECESITAS! ===
  // ===============================================
  @Post('login')
  async login(@Body() loginDto: { email: string, password: string }) {
    console.log(`Intento de login para el email: ${loginDto.email}`); // <-- Log de diagnóstico
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    
    // Si validateUser devuelve null, lanzamos una excepción 401 Unauthorized clara.
    if (!user) {
      console.log(`Login fallido para: ${loginDto.email}. Credenciales inválidas.`); // <-- Log de diagnóstico
      throw new UnauthorizedException('Las credenciales proporcionadas son incorrectas.');
    }

    console.log(`Login exitoso para: ${loginDto.email}. Generando token...`); // <-- Log de diagnóstico
    // Si el usuario es válido, procedemos a generar el token.
    return this.authService.login(user);
  }
  // ===============================================

  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async findAll() {
    // PRUEBA 1: Verificamos que estamos entrando a esta función
    console.log('--- Iniciando findAll en UsersController ---');

    // 1. Obtenemos la lista de usuarios
    const users = await this.usersService.findAll();

    // PRUEBA 2: Mostramos los datos EXACTOS que vienen del servicio
    console.log('--- Datos recibidos del servicio (CON contraseña): ---');
    console.log(users);

    // 2. Transformamos la lista para eliminar la contraseña
    const usersWithoutPassword = users.map(user => {
      const { password, ...result } = user;
      return result;
    });

    // PRUEBA 3: Mostramos los datos DESPUÉS de la transformación
    console.log('--- Datos después de la transformación (SIN contraseña): ---');
    console.log(usersWithoutPassword);

    // 3. Devolvemos la nueva lista segura
    console.log('--- Enviando respuesta al cliente. ---');
    return usersWithoutPassword;
  }
  @Delete('me') // <-- Ruta: DELETE /users/me
  @UseGuards(AuthGuard('jwt')) // <-- Solo usuarios logueados pueden eliminar su propia cuenta
  async deleteMyAccount(@Request() req: ExpressRequest) {
    // req.user contiene el payload del token (incluyendo el ID)
const userId = (req.user as any).id;
return this.usersService.remove(userId);
  }
  @Delete(':id')
@Roles(Role.Admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
async deleteUserById(@Param('id') id: string) {
  const user = await this.usersService.findOne(+id);
  if (!user) {
    throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
  }
  await this.usersService.remove(+id);
  return { message: `Usuario con ID ${id} eliminado correctamente.` };
}

}