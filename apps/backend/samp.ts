import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Unique,
  Index,
  JoinColumn,
  OneToOne,
} from "typeorm";

// 1. Users
@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ type: "varchar", length: 20, unique: true, nullable: true })
  phone?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  password_hash?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  username?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  avatar_url?: string;

  @Column({ type: "varchar", length: 100, unique: true, nullable: true })
  wechat_openid?: string;

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at!: Date;

  @Column({ type: "datetime", nullable: true })
  last_login_at?: Date;

  @Column({ type: "boolean", default: true })
  is_active!: boolean;

  // Relations
  @OneToMany(() => Note, (note) => note.user)
  notes!: Note[];

  @OneToMany(() => Tag, (tag) => tag.user)
  tags!: Tag[];

  @OneToMany(() => StudyPlan, (plan) => plan.user)
  study_plans!: StudyPlan[];

  @OneToMany(() => ReviewTask, (task) => task.user)
  review_tasks!: ReviewTask[];

  @OneToMany(() => AIConversation, (conv) => conv.user)
  ai_conversations!: AIConversation[];

  @OneToMany(() => KnowledgeNode, (node) => node.user)
  knowledge_nodes!: KnowledgeNode[];

  @OneToOne(() => UserSetting, (setting) => setting.user)
  user_setting?: UserSetting;
}

// 2. Notes
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

// 3. Tags
@Entity({ name: "tags" })
@Unique("user_tag_unique", ["user_id", "name"])
export class Tag {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ type: "bigint" })
  user_id!: string;

  @ManyToOne(() => User, (user) => user.tags, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @OneToMany(() => NoteTag, (nt) => nt.tag)
  note_tags!: NoteTag[];
}

// 4. NoteTags
@Entity({ name: "note_tags" })
@Unique("note_tag_unique", ["note_id", "tag_id"])
export class NoteTag {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ type: "bigint" })
  note_id!: string;

  @ManyToOne(() => Note, (note) => note.note_tags, { onDelete: "CASCADE" })
  @JoinColumn({ name: "note_id" })
  note!: Note;

  @Column({ type: "bigint" })
  tag_id!: string;

  @ManyToOne(() => Tag, (tag) => tag.note_tags, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tag_id" })
  tag!: Tag;
}

// 5. StudyPlans
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

// 6. ReviewTasks
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

// 7. AIConversations
@Entity({ name: "ai_conversations" })
export class AIConversation {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ type: "bigint" })
  user_id!: string;

  @ManyToOne(() => User, (user) => user.ai_conversations, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at!: Date;

  @OneToMany(() => AIMessage, (msg) => msg.conversation)
  messages!: AIMessage[];
}

// 8. AIMessages
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

// 9. KnowledgeNodes
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

// 10. KnowledgeEdges
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

// 11. UserSettings
@Entity({ name: "user_settings" })
export class UserSetting {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ type: "bigint", unique: true })
  user_id!: string;

  @OneToOne(() => User, (user) => user.user_setting, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ type: "boolean", default: true })
  sync_enabled!: boolean;

  @Column({ type: "boolean", default: false })
  encryption_enabled!: boolean;

  @Column({ type: "varchar", length: 255, nullable: true })
  encryption_password_hash?: string;

  @Column({ type: "boolean", default: true })
  notification_enabled!: boolean;

  @UpdateDateColumn({ type: "datetime" })
  updated_at!: Date;
}
