import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  ComponentProps,
} from "react";
import { NodeToolbar, NodeProps, NodeToolbarProps } from "@xyflow/react";
import { BaseNode } from "@/components/nodes/base-node";

/* TOOLTIP CONTEXT ---------------------------------------------------------- */
const TooltipContext = createContext(false);

/* TOOLTIP NODE ------------------------------------------------------------- */
export type TooltipNodeProps = Partial<NodeProps> & {
  children?: ReactNode;
};

/**
 * A component that wraps a node and provides tooltip visibility context.
 */
export const TooltipNode = ({ selected, children }: TooltipNodeProps) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const showTooltip = useCallback(() => setTooltipVisible(true), []);
  const hideTooltip = useCallback(() => setTooltipVisible(false), []);

  return (
    <TooltipContext.Provider value={isTooltipVisible}>
      <BaseNode
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        tabIndex={0}
        selected={selected}
      >
        {children}
      </BaseNode>
    </TooltipContext.Provider>
  );
};

TooltipNode.displayName = "TooltipNode";

/* TOOLTIP CONTENT ---------------------------------------------------------- */
export type TooltipContentProps = NodeToolbarProps;

/**
 * A component that displays the tooltip content based on visibility context.
 */
export const TooltipContent = ({ position, children }: TooltipContentProps) => {
  const isTooltipVisible = useContext(TooltipContext);

  return (
    <div>
      <NodeToolbar
        isVisible={isTooltipVisible}
        className="rounded-sm bg-primary p-2 text-primary-foreground"
        tabIndex={1}
        position={position}
      >
        {children}
      </NodeToolbar>
    </div>
  );
};

TooltipContent.displayName = "TooltipContent";

/* TOOLTIP TRIGGER ---------------------------------------------------------- */
export type TooltipTriggerProps = ComponentProps<"div">;

/**
 * A component that triggers the tooltip visibility.
 */
export const TooltipTrigger = ({ children, ...props }: TooltipTriggerProps) => {
  return <div {...props}>{children}</div>;
};

TooltipTrigger.displayName = "TooltipTrigger";
