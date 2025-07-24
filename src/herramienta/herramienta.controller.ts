import { Controller, Get, Param, NotFoundException, Post, Body } from '@nestjs/common';
import { HerramientaService } from './herramienta.service';
import { Herramienta } from './herramienta.entity';
import { CrearHerramientaDto } from './dto/crear-herramienta.dto'; // Asegúrate de que exista

@Controller('herramientas')
export class HerramientaController {
  constructor(private readonly herramientaService: HerramientaService) {}

  @Get()
  findAll(): Promise<Herramienta[]> {
    return this.herramientaService.findAll();
  }

  @Get('nombre/:nombre')
  async findByNombre(@Param('nombre') nombre: string): Promise<Herramienta> {
    console.log(`[BACKEND LOG] Petición recibida en el controlador para buscar: "${nombre}"`);
    
    const herramienta = await this.herramientaService.findByNombre(nombre);
if (!herramienta) {
  throw new NotFoundException(`Herramienta con nombre "${nombre}" no encontrada en la base de datos.`);
}
    
    return herramienta;
  }

  @Get(':id')
async findById(@Param('id') id: string): Promise<Herramienta> {
  const herramienta = await this.herramientaService.findById(Number(id));
  
  if (!herramienta) {
    throw new NotFoundException(`Herramienta con ID ${id} no encontrada`);
  }

  return herramienta;
}

  @Post()
  crearHerramienta(@Body() dto: CrearHerramientaDto) {
    return this.herramientaService.crear(dto); // CORREGIDO AQUÍ
  }
}
