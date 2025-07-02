import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const BaseNode = ({
  className,
  selected,
  ...props
}: ComponentProps<"div"> & { selected?: boolean }) => (
  <div
    className={cn(
      "rounded-md border bg-card text-card-foreground font-mono font-bold",
      className,
      selected ? "border-node-selected-ring/70 border-[1.5px] shadow-lg" : "",
      "hover:ring-muted-foreground hover:ring-2",
    )}
    tabIndex={0}
    {...props}
  />
);

BaseNode.displayName = "BaseNode";
