import createMiddleware from "next-intl/middleware";

import { appConfig } from "~/libs/i18n/app-config";

const intlMiddleware = createMiddleware({
  defaultLocale: appConfig.defaultLocale,
  localePrefix: appConfig.localePrefix,
  locales: appConfig.locales,
});

export default intlMiddleware;

export const config = {
  matcher: ["/", "/(en|fr)/:path*"],
};
