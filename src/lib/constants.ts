import { defineConstants } from "@/lib/define-constants";

export const LOCALE = defineConstants(
  [
    {
      key: "EN",
      value: "en",
      localeKey: "layout.sidebar.user-settings.language-en",
    },
    {
      key: "ZH",
      value: "zh",
      localeKey: "layout.sidebar.user-settings.language-zh",
    },
  ] as const,
  "LOCALE",
);
