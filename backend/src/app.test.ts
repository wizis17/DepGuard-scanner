import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

const corsOrigin = "http://localhost:5173";

describe("health endpoints", () => {
  it("GET /api/health returns ok", async () => {
    const app = createApp({ corsOrigin, checkDb: async () => {} });
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  it("GET /api/health/db returns ok when the database answers", async () => {
    const app = createApp({ corsOrigin, checkDb: async () => {} });
    const res = await request(app).get("/api/health/db");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok", database: "connected" });
  });

  it("GET /api/health/db returns 503 without leaking details when the database is down", async () => {
    const app = createApp({
      corsOrigin,
      checkDb: async () => {
        throw new Error("connect ECONNREFUSED 127.0.0.1:5433 user=depguard");
      },
    });
    const res = await request(app).get("/api/health/db");
    expect(res.status).toBe(503);
    expect(res.body).toEqual({ status: "error", database: "unreachable" });
    expect(JSON.stringify(res.body)).not.toContain("depguard");
  });

  it("unknown routes return JSON 404", async () => {
    const app = createApp({ corsOrigin, checkDb: async () => {} });
    const res = await request(app).get("/api/nope");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Not found" });
  });
});
