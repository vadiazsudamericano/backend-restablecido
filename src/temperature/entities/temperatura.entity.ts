import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'temperaturas' })
export class Temperatura {
  @PrimaryGeneratedColumn()
  id!: number; // <-- Añade "!"

  @Column('real')
  valor!: number; // <-- Añade "!"

  @CreateDateColumn({ name: 'fecha_lectura', type: 'timestamptz' })
  fechaLectura!: Date; // <-- Añade "!"
}