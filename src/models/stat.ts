import { Intramural } from "src/models/imgame";
import { User } from "src/models/user";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Stat {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  points: number;

  @Column()
  rebounds: number;

  @Column()
  assists: number;

  @ManyToOne(() => User, user => user.stats)
  user: User;

  @ManyToOne(() => Intramural, intramural => intramural.stats)
  intramural: Intramural;

}