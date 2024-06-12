import type { Config } from "drizzle-kit";

import { env } from "~/env";

const config = {
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  dialect: "postgresql",
  schema: "./src/server/db/schema.ts",
  tablesFilter: ["app_*"],
} satisfies Config;

export default config;
