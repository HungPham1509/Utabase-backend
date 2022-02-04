import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false, length: 255 })
  name!: string;

  @Column('int', { nullable: false })
  state!: number;
}
