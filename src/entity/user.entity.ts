import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Role } from './role.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 255,
    unique: true,
  })
  username!: string;

  @Column('varchar', { nullable: false, length: 255 })
  password!: string;

  @Column('varchar', {
    nullable: false,
    length: 255,
    unique: true,
  })
  email!: string;

  @Column('varchar', { nullable: false, length: 255 })
  fullName!: string;

  @Column('varchar', { nullable: true, length: 255 })
  class?: string;

  @Column('double', { nullable: true, precision: 2 })
  score?: number;

  @ManyToMany(() => Role)
  roles!: Role[];
}
