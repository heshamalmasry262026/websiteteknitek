import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../drizzle/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Add it as an environment variable (locally in .env, on Render in the service's Environment tab)."
  );
}

// Render/Neon/most managed Postgres providers require SSL.
const client = postgres(process.env.DATABASE_URL, {
  ssl: process.env.DATABASE_URL.includes("localhost") ? false : "require",
  max: 10,
});

export const db = drizzle(client, { schema });
