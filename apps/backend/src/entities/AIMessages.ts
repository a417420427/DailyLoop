import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AIConversation } from "./AIConversations";

@Entity({ name: "ai_messages" })
export class AIMessage {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ type: "bigint" })
  conversation_id!: string;

  @ManyToOne(() => AIConversation, (conv) => conv.messages, { onDelete: "CASCADE" })
  @JoinColumn({ name: "conversation_id" })
  conversation!: AIConversation;

  @Column({ type: "enum", enum: ["user", "ai"] })
  sender!: "user" | "ai";

  @Column({ type: "text", nullable: true })
  content?: string;

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;
}