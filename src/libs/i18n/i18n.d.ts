import type en from "~/assets/locales/en.json";

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}
