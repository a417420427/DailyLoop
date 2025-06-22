import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { NoteTag } from "./NoteTags";
import { ReviewTask } from "./ReviewTasks";
import { KnowledgeNode } from "./KnowledgeNodes";

@Entity({ name: "notes" })
export class Note {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ type: "bigint" })
  user_id!: string;

  @ManyToOne(() => User, (user) => user.notes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ type: "varchar", length: 255, nullable: true })
  title?: string;

  @Column({ type: "text", nullable: true })
  content?: string;

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at!: Date;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @OneToMany(() => NoteTag, (nt) => nt.note)
  note_tags!: NoteTag[];

  @OneToMany(() => ReviewTask, (rt) => rt.note)
  review_tasks!: ReviewTask[];

  @OneToMany(() => KnowledgeNode, (kn) => kn.note)
  knowledge_nodes!: KnowledgeNode[];
}
