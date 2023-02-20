import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ingredient } from "src/models/ingredient";
import { MenuItem } from "src/models/menuitem";

@Entity()
export class MenuItemToIngredients {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  optional: boolean;

  @ManyToOne(() => Ingredient, ingredient => ingredient.menuItemToIngredients)
  ingredient: Ingredient;

  @ManyToOne(() => MenuItem, menuItem => menuItem.menuItemToIngredients)
  menuItem: MenuItem;

}