import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Herramienta } from '../herramienta/herramienta.entity';

@Entity()
export class RegistroHerramienta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Herramienta, (h) => h.registros, { eager: true })
  herramienta: Herramienta;

  @Column()
  estado: string;

  @CreateDateColumn()
  fecha: Date;
}
