import type { Config } from "drizzle-kit";

import { env } from "~/env";

const config = {
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  dialect: "postgresql",
  out: "./src/infrastructure/persistence/migrations",
  schema: "./src/infrastructure/persistence/drizzle/schemas/*.ts",
} satisfies Config;

export default config;
