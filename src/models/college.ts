import { ButteryMetaData } from "src/models/butterymetadata";
import { Intramural } from "src/models/imgame";
import { Ingredient } from "src/models/ingredient";
import { MenuItem } from "src/models/menuitem";
import { TransactionHistory } from "src/models/transactionhistory";
import { User } from "src/models/user";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class College {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  college: string;

  @Column()
  image_url: string;

  @Column()
  buttery_activated: boolean;

  @OneToMany(() => User, user => user.college)
  users: User[];

  @OneToMany(() => Intramural, intramural => intramural.team_one)
  team_ones: Intramural[];

  @OneToMany(() => Intramural, intramural => intramural.team_two)
  team_twos: Intramural[];

  @OneToMany(() => TransactionHistory, transactionHistory => transactionHistory.buttery)
  transaction_histories: TransactionHistory[];

  @OneToMany(() => MenuItem, menuItem => menuItem.buttery)
  menu_items: MenuItem[];

  @OneToOne(() => ButteryMetaData, butteryMetaData => butteryMetaData.college)
  @JoinColumn()
  buttery_metadata: ButteryMetaData;

  @OneToMany(() => Ingredient, ingredient => ingredient.buttery)
  ingredients: Ingredient[]

}