import "dotenv/config";
import { defineConfig } from "prisma/config";

// prisma generate не подключается к БД, но Prisma 7 всё равно читает config.
// На Vercel во время postinstall DIRECT_URL может быть не задан — используем fallback.
const databaseUrl =
  process.env.DIRECT_URL ??
  process.env.DATABASE_URL ??
  "postgresql://build:build@127.0.0.1:5432/build";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
