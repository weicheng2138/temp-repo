import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ModeToggle } from "./mode-toggle";
import {
  ThemeProviderContext,
  type ThemeProviderState,
} from "./theme-provider";
import { vi, describe, it, expect } from "vitest";

const customRender = (
  ui: React.ReactElement,
  providerProps: { value: ThemeProviderState },
) => {
  return render(
    <ThemeProviderContext.Provider {...providerProps}>
      {ui}
    </ThemeProviderContext.Provider>,
  );
};

describe("ModeToggle", () => {
  it("renders the mode toggle button", () => {
    const providerProps = {
      value: {
        theme: "light",
        setTheme: () => {},
      } satisfies ThemeProviderState,
    };
    customRender(<ModeToggle />, providerProps);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("changes the theme to light", async () => {
    const user = userEvent.setup();
    const setTheme = vi.fn();
    const providerProps = {
      value: {
        theme: "dark",
        setTheme,
      } satisfies ThemeProviderState,
    };
    customRender(<ModeToggle />, providerProps);
    await user.click(screen.getByRole("button"));
    await user.click(await screen.findByText("Light"));
    expect(setTheme).toHaveBeenCalledWith("light");
  });

  it("changes the theme to dark", async () => {
    const user = userEvent.setup();
    const setTheme = vi.fn();
    const providerProps = {
      value: {
        theme: "light",
        setTheme,
      } satisfies ThemeProviderState,
    };
    customRender(<ModeToggle />, providerProps);
    await user.click(screen.getByRole("button"));
    await user.click(await screen.findByText("Dark"));
    expect(setTheme).toHaveBeenCalledWith("dark");
  });

  it("changes the theme to system", async () => {
    const user = userEvent.setup();
    const setTheme = vi.fn();
    const providerProps = {
      value: {
        theme: "light",
        setTheme,
      } satisfies ThemeProviderState,
    };
    customRender(<ModeToggle />, providerProps);
    await user.click(screen.getByRole("button"));
    await user.click(await screen.findByText("System"));
    expect(setTheme).toHaveBeenCalledWith("system");
  });
});
