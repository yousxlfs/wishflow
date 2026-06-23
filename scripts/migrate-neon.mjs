import { createHash, randomUUID } from "node:crypto";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const MIGRATIONS_DIR = "prisma/migrations";

function getSql() {
  const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DIRECT_URL or DATABASE_URL must be set in .env");
  }
  return neon(url);
}

function parseStatements(sqlContent) {
  return sqlContent
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n")
    .split(";")
    .map((statement) => statement.trim())
    .filter(Boolean);
}

function checksumFor(content) {
  return createHash("sha256").update(content).digest("hex");
}

async function ensureMigrationsTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
      "id" VARCHAR(36) PRIMARY KEY,
      "checksum" VARCHAR(64) NOT NULL,
      "finished_at" TIMESTAMPTZ,
      "migration_name" VARCHAR(255) NOT NULL,
      "logs" TEXT,
      "rolled_back_at" TIMESTAMPTZ,
      "started_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
      "applied_steps_count" INTEGER NOT NULL DEFAULT 0
    )
  `;
}

async function getAppliedMigrations(sql) {
  const rows = await sql`SELECT migration_name FROM "_prisma_migrations"`;
  return new Set(rows.map((row) => row.migration_name));
}

async function applyMigration(sql, migrationName, content) {
  const statements = parseStatements(content);

  for (const statement of statements) {
    await sql.query(statement);
  }

  await sql`
    INSERT INTO "_prisma_migrations" (
      "id",
      "checksum",
      "finished_at",
      "migration_name",
      "applied_steps_count"
    ) VALUES (
      ${randomUUID()},
      ${checksumFor(content)},
      now(),
      ${migrationName},
      ${statements.length}
    )
  `;
}

async function main() {
  const sql = getSql();

  console.log("Waking up Neon...");
  await sql`SELECT 1`;

  await ensureMigrationsTable(sql);
  const applied = await getAppliedMigrations(sql);

  const migrationDirs = readdirSync(MIGRATIONS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  if (migrationDirs.length === 0) {
    console.log("No migrations found.");
    return;
  }

  let appliedCount = 0;

  for (const migrationName of migrationDirs) {
    const migrationFile = join(MIGRATIONS_DIR, migrationName, "migration.sql");
    if (!existsSync(migrationFile)) {
      continue;
    }

    if (applied.has(migrationName)) {
      console.log(`Skip ${migrationName} (already applied)`);
      continue;
    }

    const content = readFileSync(migrationFile, "utf8");
    console.log(`Apply ${migrationName}...`);
    await applyMigration(sql, migrationName, content);
    console.log(`Done ${migrationName}`);
    appliedCount += 1;
  }

  if (appliedCount === 0) {
    console.log("Database is up to date.");
    return;
  }

  const tables = await sql`
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
    ORDER BY tablename
  `;

  console.log("Tables:", tables.map((row) => row.tablename).join(", "));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
