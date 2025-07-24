// RUTA: src/herramienta/herramienta.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// Importamos la entidad con la que se va a relacionar
import { RegistroHerramienta } from '../registro-herramienta/registro-herramienta.entity';

@Entity()
export class Herramienta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  uso: string;

  @Column()
  esterilizacion: string;

  @Column()
  estado: string;

  @Column("text", { array: true })
  proceso: string[];
  
  @OneToMany(() => RegistroHerramienta, (registro) => registro.herramienta)
  registros: RegistroHerramienta[];
}