import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Note } from "./Note";
import { Tag } from "./Tag";

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
