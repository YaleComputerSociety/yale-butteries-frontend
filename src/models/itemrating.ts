import { Ingredient } from "src/models/ingredient";
import { MenuItem } from "src/models/menuitem";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ItemRating {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  order_complete: Date;

  @ManyToOne(() => MenuItem, menuItem => menuItem.item_ratings)
  menu_item: MenuItem;

  @ManyToOne(() => Ingredient, ingredient => ingredient.item_ratings)
  ingredient: Ingredient;

}