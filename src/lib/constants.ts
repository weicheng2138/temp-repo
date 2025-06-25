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

export const THEME = defineConstants(
  [
    {
      key: "LIGHT",
      value: "light",
      localeKey: "layout.sidebar.user-settings.theme-light",
    },
    {
      key: "DARK",
      value: "dark",
      localeKey: "layout.sidebar.user-settings.theme-dark",
    },
    {
      key: "SYSTEM",
      value: "system",
      localeKey: "layout.sidebar.user-settings.theme-system",
    },
  ] as const,
  "THEME",
);

/**
 * CAUTION
 * !!! Do not use input, output and default to be the value
 * react-flow has occupied these terms
 */
export const NODE_TYPES = defineConstants(
  [
    {
      key: "INPUT_INFO",
      value: "inputInfo",
    },
    {
      key: "CALCULATE",
      value: "calculate",
    },
    {
      key: "NUMBER",
      value: "num",
    },
  ] as const,
  "NODE_TYPES",
);

export const OUTPUT_DATA_TYPE = defineConstants(
  [
    {
      key: "DATA_TABLE",
      value: "DataTable",
    },
    {
      key: "INT",
      value: "int",
    },
    {
      key: "FLOAT",
      value: "float",
    },
    {
      key: "BOOLEAN",
      value: "boolean",
    },
  ] as const,
  "OUTPUT_DATA_TYPE",
);

export const USER_STATUS = defineConstants(
  [
    {
      key: "OFFLINE",
      value: 0,
      label: "Offline",
    },
    {
      key: "ONLINE",
      value: 1,
      label: "Online",
    },
    {
      key: "BANNED",
      value: 2,
      label: "Banned",
    },
  ] as const,
  "USER_STATUS",
);
