import { College } from "src/models/college";
import { Day } from "src/models/day";
import { Exception } from "src/models/exception";
import { Ingredient } from "src/models/ingredient";
import { ItemRating } from "src/models/itemrating";
import { MenuItemToIngredients } from "src/models/menuitemtoingredients";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MenuItem {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item: string;

  @Column()
  price: number;

  @ManyToOne(() => College, college => college.menu_items)
  buttery: College;

  @OneToMany(() => ItemRating, itemRating => itemRating.menu_item)
  item_ratings: ItemRating[];

  @ManyToMany(() => Day, day => day.menu_items)
  @JoinTable()
  days: Day[]

  @ManyToMany(() => Exception, exceptionDate => exceptionDate.menu_items)
  @JoinTable()
  exception_dates: Exception[]

  @ManyToMany(() => Ingredient, ingredient => ingredient.menu_items)
  @JoinTable()
  ingredients: Ingredient[]

  @OneToMany(() => MenuItemToIngredients, menuItemToIngredient => menuItemToIngredient.menuItem)
  menuItemToIngredients: MenuItemToIngredients[]

}