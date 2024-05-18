import type { LocalePrefix } from "node_modules/next-intl/dist/types/src/shared/types";

const localePrefix: LocalePrefix = "always";

export const appConfig = {
  defaultLocale: "en",
  localePrefix,
  locales: ["en", "fr"],
  name: "NextJS starter",
};
