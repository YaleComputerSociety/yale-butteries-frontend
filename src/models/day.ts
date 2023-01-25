import { MenuItem } from "src/models/menuitem";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Day {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: string;

  @ManyToMany(() => MenuItem, menuItem => menuItem.days)
  menu_items: MenuItem[]

}