import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { AIMessage } from "./AIMessages";

@Entity({ name: "ai_conversations" })
export class AIConversation {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ type: "bigint" })
  user_id!: string;

  @ManyToOne(() => User, (user) => user.ai_conversations, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at!: Date;

  @OneToMany(() => AIMessage, (msg) => msg.conversation)
  messages!: AIMessage[];
}
