import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Habit } from './Habit';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  openid?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column()
  nickname!: string;

  @OneToMany(() => Habit, habit => habit.user)
  habits!: Habit[];
}
