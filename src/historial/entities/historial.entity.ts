// RUTA: src/historial/entities/historial.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Herramienta } from '../../herramienta/herramienta.entity';

// Le decimos que esta entidad se mapea a la tabla 'registro_herramienta'
@Entity('registro_herramienta') 
export class Historial {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Herramienta)
  // Le decimos que la columna de la relación se llama EXACTAMENTE 'herramientaId'
  @JoinColumn({ name: 'herramientaId' })
  herramienta!: Herramienta;

  // Le decimos que esta propiedad se mapea a la columna 'estado'
  @Column({ name: 'estado' })
  estadoAlEscanear!: string;

  // Le decimos que esta propiedad se mapea a la columna 'fecha'
  @CreateDateColumn({ name: 'fecha' })
  fechaEscaneo!: Date;
}