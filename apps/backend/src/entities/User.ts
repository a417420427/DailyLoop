import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "varchar", length: 20, unique: true })
  phone!: string;

  @Column({ name: "password_hash", type: "varchar", length: 255 })
  passwordHash!: string;

  @Column({ type: "varchar", length: 100 })
  username!: string;

  @Column({ name: "avatar_url", type: "varchar", length: 255, nullable: true })
  avatarUrl?: string;

  @Column({ name: "wechat_openid", type: "varchar", length: 100, nullable: true, unique: true })
  wechatOpenid?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @Column({ name: "last_login_at", type: "datetime", nullable: true })
  lastLoginAt?: Date;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive!: boolean;
}
