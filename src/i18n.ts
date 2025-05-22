import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "@/locales/en/translation.json";
import translationZH from "@/locales/zh/translation.json";
import routesEN from "@/locales/en/route.json";
import routesZH from "@/locales/zh/route.json";

export type LocaleRouteType = keyof typeof routesEN;
export const defaultNS = "translation";
export const resources = {
  en: {
    translation: translationEN,
    route: routesEN,
  },
  zh: {
    translation: translationZH,
    reoute: routesZH,
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  defaultNS,
  // lng: "zh",
  fallbackLng: "en",
});

export default i18n;
