import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "study_plans" })
export class StudyPlan {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ type: "bigint" })
  user_id!: string;

  @ManyToOne(() => User, (user) => user.study_plans, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ type: "varchar", length: 255, nullable: true })
  title?: string;

  @Column({ type: "int", default: 0 })
  target_note_count!: number;

  @Column({ type: "date", nullable: true })
  start_date?: string;

  @Column({ type: "date", nullable: true })
  end_date?: string;

  @Column({ type: "float", default: 0 })
  progress!: number;

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at!: Date;
}
