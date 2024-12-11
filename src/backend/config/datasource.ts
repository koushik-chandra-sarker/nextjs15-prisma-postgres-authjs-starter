import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "@/backend/entity/User";
import { Role } from "@/backend/entity/Role";
import { Customer } from "@/backend/entity/Customer";

const isCompiled = __filename.endsWith(".js");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5455"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "kashabazar",
  entities: [isCompiled ? "dist/backend/entity/**/*.js" : "src/backend/entity/**/*.ts"],
  migrations: [isCompiled ? "dist/backend/migrations/**/*.js" : "src/backend/migrations/**/*.ts"],
  synchronize: true, // Disable in production
});

export default AppDataSource;
