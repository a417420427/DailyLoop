

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { KnowledgeNode } from "./KnowledgeNodes";


@Entity({ name: "knowledge_edges" })
@Unique("edge_unique", ["from_node_id", "to_node_id"])
export class KnowledgeEdge {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ type: "bigint" })
  from_node_id!: string;

  @ManyToOne(() => KnowledgeNode, (node) => node.from_edges, { onDelete: "CASCADE" })
  @JoinColumn({ name: "from_node_id" })
  from_node!: KnowledgeNode;

  @Column({ type: "bigint" })
  to_node_id!: string;

  @ManyToOne(() => KnowledgeNode, (node) => node.to_edges, { onDelete: "CASCADE" })
  @JoinColumn({ name: "to_node_id" })
  to_node!: KnowledgeNode;

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;
}