import { IsNumber } from 'class-validator';

export class CreateTemperaturaDto {
  @IsNumber()
  valor!: number; // <-- Añade el "!" y la línea roja desaparece
}