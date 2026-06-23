import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const name = process.argv[2];

if (!name) {
  console.error("Usage: npm run prisma:migrate:create -- <migration_name>");
  process.exit(1);
}

const timestamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const migrationName = `${timestamp}_${name}`;
const migrationDir = join("prisma", "migrations", migrationName);
const migrationFile = join(migrationDir, "migration.sql");

const fromArgs = ["--from-migrations", "prisma/migrations"];
const sql = execSync(
  `npx prisma migrate diff ${fromArgs.join(" ")} --to-schema prisma/schema.prisma --script`,
  { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
).trim();

if (!sql) {
  console.log("No schema changes detected.");
  process.exit(0);
}

mkdirSync(migrationDir, { recursive: true });
writeFileSync(migrationFile, `${sql}\n`, "utf8");

console.log(`Created ${migrationFile}`);
console.log("Run: npm run prisma:migrate");
