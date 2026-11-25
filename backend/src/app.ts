import cors from "cors";
import express, { type ErrorRequestHandler } from "express";
import helmet from "helmet";

export interface AppOptions {
  corsOrigin: string;
  /** Resolves when the database is reachable. Injected so tests need no real DB. */
  checkDb: () => Promise<void>;
}

export function createApp({ corsOrigin, checkDb }: AppOptions) {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({ origin: corsOrigin }));
  app.use(express.json({ limit: "1mb" }));

  // Liveness: the process is up.
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Readiness: the process can reach PostgreSQL.
  app.get("/api/health/db", async (_req, res) => {
    try {
      await checkDb();
      res.json({ status: "ok", database: "connected" });
    } catch {
      // Don't leak connection details (host, user) to the client.
      res.status(503).json({ status: "error", database: "unreachable" });
    }
  });

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  };
  app.use(errorHandler);

  return app;
}
