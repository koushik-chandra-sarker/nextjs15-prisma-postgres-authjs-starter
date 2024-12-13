import "reflect-metadata";
import { DataSource } from "typeorm";
import {User} from "@/backend/entities/User";
import {Role} from "@/backend/entities/Role";
import {Customer} from "@/backend/entities/Customer";

const isCompiled = __filename.endsWith(".js");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5455"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "kashabazar",
  entities: [User, Role, Customer],
  migrations: [isCompiled ? "dist/backend/migrations/**/*.js" : "src/backend/migrations/**/*.ts"],
  synchronize: true, // Disable in production
});
let isDatabaseConnected = false; // Flag to track the connection state

export async function initializeDataSource() {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log("Database connected");
      isDatabaseConnected = true; // Mark as successfully connected
    } catch (error) {
      console.error("Error initializing the database:", error);
      isDatabaseConnected = false; // Mark as failed
      throw new Error("Failed to initialize the database");
    }
  }
  return isDatabaseConnected; // Return the connection state
}

export default AppDataSource;
