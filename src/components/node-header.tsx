import { useCallback, ReactNode, ComponentProps } from "react";
import { useNodeId, useReactFlow } from "@xyflow/react";
import { Code, EllipsisVertical, Pencil, Trash } from "lucide-react";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { AddEditInputNodeDialog } from "@/components/dialogs/add-edit-input-node-dialog";
import { EditCodeDialog } from "./dialogs/edit-code-dialog";

/* NODE HEADER -------------------------------------------------------------- */

export type NodeHeaderProps = ComponentProps<"header">;

/**
 * A container for a consistent header layout intended to be used inside the
 * `<BaseNode />` component.
 */
export const NodeHeader = ({ className, ...props }: NodeHeaderProps) => {
  return (
    <header
      {...props}
      className={cn(
        "flex items-center justify-between gap-2 border-b-1 py-1 px-3 min-w-36",
        // Remove or modify these classes if you modify the padding in the
        // `<BaseNode />` component.
        className,
      )}
    />
  );
};

NodeHeader.displayName = "NodeHeader";

/* NODE HEADER TITLE -------------------------------------------------------- */

export type NodeHeaderTitleProps = ComponentProps<"h3"> & {
  asChild?: boolean;
};

/**
 * The title text for the node. To maintain a native application feel, the title
 * text is not selectable.
 */
export const NodeHeaderTitle = ({
  className,
  asChild,
  ...props
}: NodeHeaderTitleProps) => {
  const Comp = asChild ? Slot : "h3";

  return (
    <Comp
      {...props}
      className={cn(className, "user-select-none flex-1 font-normal truncate")}
    />
  );
};

NodeHeaderTitle.displayName = "NodeHeaderTitle";

/* NODE HEADER ICON --------------------------------------------------------- */

export type NodeHeaderIconProps = ComponentProps<"span">;

export const NodeHeaderIcon = ({
  className,
  ...props
}: NodeHeaderIconProps) => {
  return <span {...props} className={cn(className, "[&>*]:size-5")} />;
};

NodeHeaderIcon.displayName = "NodeHeaderIcon";

/* NODE HEADER ACTIONS ------------------------------------------------------ */

export type NodeHeaderActionsProps = ComponentProps<"div">;

/**
 * A container for right-aligned action buttons in the node header.
 */
export const NodeHeaderActions = ({
  className,
  ...props
}: NodeHeaderActionsProps) => {
  return (
    <div
      {...props}
      className={cn(
        "ml-auto flex items-center gap-1 justify-self-end",
        className,
      )}
    />
  );
};

NodeHeaderActions.displayName = "NodeHeaderActions";

/* NODE HEADER ACTION ------------------------------------------------------- */

export type NodeHeaderActionProps = ButtonProps & {
  label: string;
};

/**
 * A thin wrapper around the `<Button />` component with a fixed sized suitable
 * for icons.
 *
 * Because the `<NodeHeaderAction />` component is intended to render icons, it's
 * important to provide a meaningful and accessible `label` prop that describes
 * the action.
 */
export const NodeHeaderAction = ({
  className,
  label,
  title,
  ...props
}: NodeHeaderActionProps) => {
  return (
    <Button
      variant="ghost"
      aria-label={label}
      title={title ?? label}
      className={cn(className, "nodrag size-6 p-1")}
      {...props}
    />
  );
};

NodeHeaderAction.displayName = "NodeHeaderAction";

//

export type NodeHeaderMenuActionProps = Omit<
  NodeHeaderActionProps,
  "onClick"
> & {
  trigger?: ReactNode;
};

/**
 * Renders a header action that opens a dropdown menu when clicked. The dropdown
 * trigger is a button with an ellipsis icon. The trigger's content can be changed
 * by using the `trigger` prop.
 *
 * Any children passed to the `<NodeHeaderMenuAction />` component will be rendered
 * inside the dropdown menu. You can read the docs for the shadcn dropdown menu
 * here: https://ui.shadcn.com/docs/components/dropdown-menu
 *
 */
export const NodeHeaderMenuAction = ({
  trigger,
  children,
  ...props
}: NodeHeaderMenuActionProps) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <NodeHeaderAction {...props}>
          {trigger ?? <EllipsisVertical />}
        </NodeHeaderAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
};

NodeHeaderMenuAction.displayName = "NodeHeaderMenuAction";

/* NODE HEADER DELETE ACTION --------------------------------------- */

export const NodeHeaderDeleteAction = () => {
  const id = useNodeId();
  const { setNodes } = useReactFlow();

  const handleClick = useCallback(() => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
    // setTimeout(() => {
    // }, 0);
  }, [id, setNodes]);

  return (
    <NodeHeaderAction onClick={handleClick} variant="ghost" label="Delete node">
      <Trash />
    </NodeHeaderAction>
  );
};

NodeHeaderDeleteAction.displayName = "NodeHeaderDeleteAction";

/* NODE HEADER EDIT ACTION --------------------------------------- */

export const NodeHeaderEditCodeAction = () => {
  const id = useNodeId();
  const { getNode } = useReactFlow();
  const currentNode = id ? getNode(id) : undefined;

  return (
    <EditCodeDialog inputNode={currentNode}>
      <NodeHeaderAction variant="ghost" label="Edit code">
        <Code />
      </NodeHeaderAction>
    </EditCodeDialog>
  );
};

NodeHeaderEditCodeAction.displayName = "NodeHeaderEditCodeAction";
