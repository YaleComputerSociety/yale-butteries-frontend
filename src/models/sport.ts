import { Intramural } from "src/models/imgame";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sport {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sport: string;

  @OneToMany(() => Intramural, intramural => intramural.sport)
  intramurals: Intramural[];

}