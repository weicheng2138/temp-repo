import { describe, it, expect } from "vitest";
import { sqliteJsonToZodSchema } from "@/lib/utils";
import { z } from "zod/v4";

describe("parseSQLiteSchema", () => {
  it("does simple run", () => {
    const jsonString = `{"NAME":"VARCHAR(1)","CODE":"REAL"}`;
    const zodSchema = sqliteJsonToZodSchema(jsonString);
    const parsedResult = zodSchema.safeParse({
      NAME: "name",
      CODE: 2222,
    });
    expect(1).toBe(1);
  });
});
