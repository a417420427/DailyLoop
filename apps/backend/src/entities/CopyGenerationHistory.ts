import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "copy_generation_histories" })
export class CopyGenerationHistory {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ type: "simple-array" })
  keywords!: string[];

  @Column({ type: "varchar", length: 100 })
  style!: string;

  @Column({ type: "varchar", length: 20 })
  length!: "short" | "medium" | "long";

  @Column({ type: "text" })
  prompt!: string;

  @Column({ type: "text" })
  result!: string;

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @ManyToOne(() => User, (user) => user.copy_generation_histories, { onDelete: "CASCADE" })
  user!: User;
}
