import { Position } from "src/models/position";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PermissionType {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @ManyToMany(() => Position)
  @JoinTable()
  positions: Position[];

}