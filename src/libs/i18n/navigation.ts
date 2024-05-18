import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { appConfig } from "./app-config";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    localePrefix: appConfig.localePrefix,
    locales: appConfig.locales,
  });
