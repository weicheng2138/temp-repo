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
