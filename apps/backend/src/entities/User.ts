import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Note } from "./Note";
import { Tag } from "./Tag";
import { StudyPlan } from "./StudyPlans";
import { ReviewTask } from "./ReviewTasks";
import { AIConversation } from "./AIConversations";
import { KnowledgeNode } from "./KnowledgeNodes";
import { UserSetting } from "./UserSettings";
import { CopyGenerationHistory } from "./CopyGenerationHistory";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ type: "varchar", length: 20, unique: true, nullable: true })
  phone?: string;

  @Column({
    name: "password_hash",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  passwordHash?: string;

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

  @OneToMany(() => CopyGenerationHistory, (history) => history.user)
  copy_generation_histories!: CopyGenerationHistory[];
}
