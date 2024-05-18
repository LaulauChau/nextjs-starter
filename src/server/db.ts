import { PrismaClient } from "@prisma/client";

import { env } from "~/env";

const prismaClientSingleton = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["error", "query", "warn"] : ["error"],
  });

// biome-ignore lint/suspicious/noShadowRestrictedNames: We need to shadow the globalThis object to store the prisma instance in it
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
