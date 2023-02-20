import { College } from "src/models/college";
import { Position } from "src/models/position";
import { Stat } from "src/models/stat";
import { TransactionHistory } from "src/models/transactionhistory";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  netid: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  credit_card_hash: string;

  @ManyToOne(() => College, college => college.users)
  college: College;

  @ManyToOne(() => Position, position => position.users)
  position: Position;

  @OneToMany(() => Stat, stat => stat.user)
  stats: Stat[];

  @OneToMany(() => TransactionHistory, transactionHistory => transactionHistory.user)
  transaction_histories: TransactionHistory[];

}