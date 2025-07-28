import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Herramienta } from '../herramienta/herramienta.entity';

@Entity({ name: 'registro_herramienta' })
export class RegistroHerramienta {

  // Le decimos a TypeScript que confíe en que TypeORM inicializará el 'id'.
  @PrimaryGeneratedColumn()
  id!: number;

  // 'estado' ya está inicializado, así que no necesita el '!'.
  @Column({ default: 'disponible' })
  estado: string = 'disponible';

  // Le decimos a TypeScript que confíe en que TypeORM/@CreateDateColumn inicializará la 'fecha'.
  @CreateDateColumn()
  fecha!: Date;

  // Le decimos a TypeScript que confíe en que TypeORM inicializará la relación 'herramienta'.
  @ManyToOne(() => Herramienta, (herramienta) => herramienta.registros, { nullable: false })
  @JoinColumn({ name: 'herramienta_id' })
  herramienta!: Herramienta;
}