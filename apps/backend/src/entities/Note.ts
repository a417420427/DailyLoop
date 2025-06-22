import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "notes" })
export class Note {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  user_id!: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ length: 255, nullable: true })
  title?: string;

  @Column("text", { nullable: true })
  content?: string;

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at!: Date;

  @Column({ default: false })
  is_deleted!: boolean;
}
