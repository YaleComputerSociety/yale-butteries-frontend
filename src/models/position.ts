import { PermissionType } from "src/models/permissiontype";
import { User } from "src/models/user";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Position {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: string;

  @OneToMany(() => User, user => user.position)
  users: User[];

  @ManyToMany(() => PermissionType, permissionType => permissionType.positions)
  permissionTypes: PermissionType[]
  
}