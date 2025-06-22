

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
import { Note } from "./Note";
import { User } from "./User";
import { KnowledgeEdge } from "./KnowledgeEdges";




@Entity({ name: "knowledge_nodes" })
export class KnowledgeNode {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ type: "bigint" })
  note_id!: string;

  @ManyToOne(() => Note, (note) => note.knowledge_nodes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "note_id" })
  note!: Note;

  @Column({ type: "bigint" })
  user_id!: string;

  @ManyToOne(() => User, (user) => user.knowledge_nodes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ type: "float", default: 0 })
  position_x!: number;

  @Column({ type: "float", default: 0 })
  position_y!: number;

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at!: Date;

  @OneToMany(() => KnowledgeEdge, (edge) => edge.from_node)
  from_edges!: KnowledgeEdge[];

  @OneToMany(() => KnowledgeEdge, (edge) => edge.to_node)
  to_edges!: KnowledgeEdge[];
}
