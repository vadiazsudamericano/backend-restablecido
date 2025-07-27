// RUTA: src/herramienta/herramienta.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// Importamos la entidad con la que se va a relacionar
import { RegistroHerramienta } from '../registro-herramienta/registro-herramienta.entity';

@Entity({ name: 'herramienta' }) // Es una buena práctica darle un nombre explícito a la tabla
export class Herramienta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  descripcion!: string;

  @Column()
  uso!: string;

  @Column()
  esterilizacion!: string;

  // ===============================================
  // === ¡ESTE ES EL ÚNICO CAMBIO QUE NECESITAS! ===
  // ===============================================
  @Column({
    type: 'varchar',
    nullable: true,      // 1. Permite que la columna esté vacía temporalmente para las filas existentes.
    default: 'Disponible' // 2. Asigna 'Disponible' a cualquier herramienta nueva que se cree.
  })
  estado!: string;
  // ===============================================

  @Column("text", { array: true })
  proceso!: string[];
  
  @OneToMany(() => RegistroHerramienta, (registro) => registro.herramienta)
  registros!: RegistroHerramienta[];
}