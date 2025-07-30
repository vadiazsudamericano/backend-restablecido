import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { Herramienta } from '../../herramienta/herramienta.entity';

@Entity()
export class Historial {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  herramientaId!: number;

  @Column()
  userId!: number;

  @Column({ nullable: true })
  accion?: string;

  @Column({ nullable: true })
  referenciaVisual?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Herramienta)
  @JoinColumn({ name: 'herramientaId' })
  herramienta!: Herramienta;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  usuario!: User;
}
