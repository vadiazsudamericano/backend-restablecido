import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return '¡Bienvenido al backend desplegado en Railway!';
  }
}
