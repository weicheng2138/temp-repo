import { ThemeProviderContext } from "@/components/theme-provider";
import { use } from "react";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const context = use(ThemeProviderContext);
  if (!context) {
    throw new Error("Toaster must be used within a ThemeProvider");
  }
  const { theme = "system" } = context;

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
