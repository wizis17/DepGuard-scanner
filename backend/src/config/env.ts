import "dotenv/config";
import { z } from "zod";

// Validate environment variables once at startup so a missing DATABASE_URL
// fails loudly instead of surfacing later as a confusing connection error.
const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  DATABASE_URL: z
    .string()
    .regex(/^postgres(ql)?:\/\//, "DATABASE_URL must be a postgresql:// connection string"),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:");
  for (const issue of parsed.error.issues) {
    console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
  }
  console.error("Copy backend/.env.example to backend/.env and fill in the values.");
  process.exit(1);
}

export const env = parsed.data;
