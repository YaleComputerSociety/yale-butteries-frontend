import { College } from "src/models/college";
import { ItemRating } from "src/models/itemrating";
import { MenuItem } from "src/models/menuitem";
import { MenuItemToIngredients } from "src/models/menuitemtoingredients";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ingredient {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ingredient: string;

  @Column()
  price: number;

  @Column()
  available: boolean;

  @OneToMany(() => ItemRating, itemRating => itemRating.ingredient)
  item_ratings: ItemRating[];

  @ManyToOne(() => College, college => college.ingredients)
  buttery: College

  @ManyToMany(() => MenuItem, menuItem => menuItem.ingredients)
  menu_items: MenuItem[]

  @OneToMany(() => MenuItemToIngredients, menuItemToIngredients => menuItemToIngredients.ingredient)
  menuItemToIngredients: MenuItemToIngredients[]

}