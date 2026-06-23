import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",     // или ./src/lib/db/schema.ts
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: "./sqlite.db",             // файл базы будет создан здесь
  },
});