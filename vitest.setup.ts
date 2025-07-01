import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Unmounts React trees that were mounted with render.
afterEach(() => {
  cleanup();
});
