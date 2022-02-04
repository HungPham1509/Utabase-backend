import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
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

  @Column('varchar', { nullable: false, length: 255, name: 'full_name' })
  fullName!: string;

  @Column('varchar', { nullable: true, length: 255 })
  class?: string;

  @Column('double', { nullable: true})
  score?: number;

  @ManyToMany(() => Role, {cascade: true, eager: true})
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "role_id", referencedColumnName: "id" }
  })
  roles!: Role[];
}
