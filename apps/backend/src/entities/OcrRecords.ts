import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "ocr_records" })
export class OcrRecord {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  // 关联用户
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ name: "user_id", type: "bigint" })
  user_id!: string;

  @Column({ type: "varchar", length: 20 })
  type!: "ocr" | "document" | "scan";

  @Column({ name: "image_url", type: "varchar", length: 500, nullable: true })
  image_url?: string;

  @Column({ type: "json" })
  result!: any;

  @Column({ type: 'decimal', default: 0 })
  imageWidth!: number
  
  @Column({ type: 'decimal', default: 0 })
  imageHeight!: number

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at!: Date;
}
