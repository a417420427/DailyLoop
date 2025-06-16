import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User';
import { CheckinRecord } from './CheckinRecord';

@Entity()
export class Habit {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  icon!: string;

  @Column({ default: 'daily' }) // e.g. 'daily', 'weekly'
  frequency!: string;

  @Column({ type: 'time', nullable: true })
  remindTime?: string;

  @Column({ nullable: true })
  targetDays?: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, user => user.habits)
  user!: User;

  @OneToMany(() => CheckinRecord, record => record.habit)
  records!: CheckinRecord[];
}
