import { TransactionHistory } from "src/models/transactionhistory";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TransactionItem {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item_name: string;

  @Column()
  item_cost: number;

  @ManyToOne(() => TransactionHistory, transactionHistory => transactionHistory.transaction_items)
  history: TransactionHistory;  

}