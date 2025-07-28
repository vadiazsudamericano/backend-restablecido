// RUTA: src/herramienta/herramienta.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RegistroHerramienta } from '../registro-herramienta/registro-herramienta.entity';

@Entity({ name: 'herramienta' })
export class Herramienta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  descripcion!: string;

  // === CORRECCIÓN #1 ===
  // Si 'uso' puede no especificarse al principio, lo hacemos opcional.
  @Column({ nullable: true }) 
  uso?: string; // El '?' hace que sea opcional también para TypeScript

  // === CORRECCIÓN #2 ===
  // Lo mismo para 'esterilizacion'. La hacemos opcional.
  @Column({ nullable: true })
  esterilizacion?: string;

  // === ¡El campo 'estado' ya lo tienes resuelto perfectamente! ===
  @Column({
    type: 'varchar',
    nullable: true,
    default: 'Disponible'
  })
  estado: string = 'Disponible';

  // === CORRECCIÓN #3 ===
  // Para un array, el mejor valor por defecto es un array vacío [].
  // Así nunca será nulo.
  @Column("text", { array: true, default: () => "'{}'" }) // El default para un array en postgres
  proceso: string[] = [];
  
  @OneToMany(() => RegistroHerramienta, (registro) => registro.herramienta)
  registros!: RegistroHerramienta[];
}