import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { User } from "./User";
import { NoteTag } from "./NoteTags";

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
