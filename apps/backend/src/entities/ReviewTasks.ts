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
import { Note } from "./Note";

@Entity({ name: "review_tasks" })
export class ReviewTask {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ type: "bigint" })
  user_id!: string;

  @ManyToOne(() => User, (user) => user.review_tasks, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ type: "bigint" })
  note_id!: string;

  @ManyToOne(() => Note, (note) => note.review_tasks, { onDelete: "CASCADE" })
  @JoinColumn({ name: "note_id" })
  note!: Note;

  @Column({ type: "datetime", nullable: true })
  scheduled_time?: Date;

  @Column({ type: "boolean", default: false })
  is_completed!: boolean;

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at!: Date;
}
