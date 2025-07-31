// RUTA: src/historial/historial.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/user.entity';

@Entity()
export class Historial {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  herramientaId!: number;

  @Column()
  referenciaVisual!: string;

  @ManyToOne(() => User, (user) => user.historial)
  user!: User;
}
