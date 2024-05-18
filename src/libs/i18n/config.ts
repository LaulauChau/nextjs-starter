import deepmerge from "deepmerge";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

import { appConfig } from "./app-config";

export default getRequestConfig(async ({ locale }) => {
  if (!appConfig.locales.includes(locale)) {
    return notFound();
  }

  const defaultMessage = (await import("~/assets/locales/en.json")).default;
  const requestedMessage = (await import(`~/assets/locales/${locale}.json`))
    .default;

  return {
    messages: deepmerge(defaultMessage, requestedMessage),
  };
});
