import { drizzle } from "drizzle-orm/node-postgres"
const connectionString = process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432/kashabazar"
const db = drizzle(connectionString);
