import { College } from "src/models/college";
import { Sport } from "src/models/sport";
import { Stat } from "src/models/stat";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Intramural {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  team_1_score: number;

  @Column()
  team_2_score: number;

  @Column()
  date: Date;

  @ManyToOne(() => College, college => college.team_ones)
  team_one: College;

  @ManyToOne(() => College, college => college.team_twos)
  team_two: College;

  @ManyToOne(() => Sport, sport => sport.intramurals)
  sport: Sport;

  @OneToMany(() => Stat, stat => stat.intramural)
  stats: Stat[];

}