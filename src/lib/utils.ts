import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z, ZodType } from "zod/v4";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FieldSchema = {
  type: "string" | "number" | "boolean" | "unknown";
  label: string;
};

type Schema = Record<string, FieldSchema>;

// Helper: Map SQLite type to zod type
function sqliteTypeToZod(sqliteType: string): ZodType {
  const type = sqliteType.toUpperCase();
  if (
    type.includes("CHAR") ||
    type.includes("TEXT") ||
    type.includes("CLOB") ||
    type.includes("VARCHAR")
  ) {
    return z.string();
  }
  if (
    type.includes("INT") ||
    type.includes("REAL") ||
    type.includes("FLOA") ||
    type.includes("DOUB") ||
    type.includes("NUMERIC")
  ) {
    return z.number();
  }
  if (type === "BOOLEAN") {
    return z.boolean();
  }
  return z.unknown();
}

// Build zod schema from SQLite JSON string
export function sqliteJsonToZodSchema(jsonString: string) {
  const rawSchema = JSON.parse(jsonString) as Record<string, string>;

  const zodShape: Record<string, ZodType> = {};

  for (const [field, sqliteType] of Object.entries(rawSchema)) {
    zodShape[field] = sqliteTypeToZod(sqliteType);
  }

  return z.object(zodShape);
}
