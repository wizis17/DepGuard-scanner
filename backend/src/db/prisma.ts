import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { env } from "../config/env.js";

// Prisma 7 connects through a driver adapter (node-postgres here).
const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });

export const prisma = new PrismaClient({ adapter });

/** Resolves if the database answers a trivial query, rejects otherwise. */
export async function checkDatabase(): Promise<void> {
  await prisma.$queryRaw`SELECT 1`;
}
