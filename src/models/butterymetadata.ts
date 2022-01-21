import { College } from "src/models/college";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ButteryMetaData {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  max_queue_size: number;

  @Column()
  reserved_queue_spots: number;

  @OneToOne(() => College, college => college.buttery_metadata)
  college: College;

}