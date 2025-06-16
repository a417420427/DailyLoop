import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

const config = dotenv.config().parsed || {};
console.log();
// console.log(process.env, 'eee')
export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.DB_HOST || "localhost",
  port: parseInt(config.DB_PORT || "3306"),
  username: config.DB_USER || "root",
  password: config.DB_PASS || "password",
  database: config.DB_NAME || "daily_checkin",
  synchronize: true, // 开发时自动同步实体到数据库，生产建议 false + 手动迁移
  logging: false,
  entities: [__dirname + "/../models/*.ts"],
  migrations: [],
  subscribers: [],
});
