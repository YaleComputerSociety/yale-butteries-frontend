import { MenuItem } from "src/models/menuitem";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Exception {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day_start: Date;

  @Column()
  day_stop: Date;

  @ManyToMany(() => MenuItem, menuItem => menuItem.exception_dates)
  menu_items: MenuItem[]

}