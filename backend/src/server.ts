import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { checkDatabase, prisma } from "./db/prisma.js";

const app = createApp({ corsOrigin: env.CORS_ORIGIN, checkDb: checkDatabase });

const server = app.listen(env.PORT, async () => {
  console.log(`DepGuard API listening on http://localhost:${env.PORT}`);
  try {
    await checkDatabase();
    console.log("Database: connected");
  } catch (err) {
    console.error("Database: NOT reachable — is the container running? (docker compose up -d db)");
    console.error(err instanceof Error ? err.message : err);
  }
});

async function shutdown(signal: string) {
  console.log(`${signal} received, shutting down`);
  server.close();
  await prisma.$disconnect();
  process.exit(0);
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
