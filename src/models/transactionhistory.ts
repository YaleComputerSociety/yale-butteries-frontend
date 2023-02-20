import { College } from "src/models/college";
import { TransactionItem } from "src/models/transactionitem";
import { User } from "src/models/user";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TransactionHistory {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_placed: Date;

  @Column()
  order_complete: Date;

  @Column()
  queue_size_on_placement: number;

  @Column()
  queue_size_on_complete: number;

  @Column()
  in_progress: boolean;

  @Column()
  total_price: number;

  @ManyToOne(() => College, college => college.transaction_histories)
  buttery: College;

  @ManyToOne(() => User, user => user.transaction_histories)
  user: User;

  @OneToMany(() => TransactionItem, transactionItem => transactionItem.history)
  transaction_items: TransactionItem[];

}