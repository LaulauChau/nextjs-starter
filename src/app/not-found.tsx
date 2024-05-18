import { redirect } from "next/navigation";

import { appConfig } from "~/libs/i18n/app-config";

export default function NotFound() {
  redirect(`/${appConfig.defaultLocale}`);
}
