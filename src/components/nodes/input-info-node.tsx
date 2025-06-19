import { useCallback, useId } from "react";
import { type Node, type NodeProps, useReactFlow } from "@xyflow/react";

import { BaseNode } from "@/components/nodes/base-node";
import {
  NodeHeader,
  NodeHeaderTitle,
  NodeHeaderActions,
  NodeHeaderMenuAction,
} from "@/components/node-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Grid2x2, Grid2x2Plus, Info, Trash } from "lucide-react";
import { AddEditInputNodeDialog } from "@/components/dialogs/add-edit-input-node-dialog";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type InputInfoData = Node<{
  value: number;
  label: string;
  jonbo: string;
}>;

export function InputInfoNode({
  id,
  data,
  selected,
}: NodeProps<InputInfoData>) {
  const productSelectTableId = useId();
  const { setNodes } = useReactFlow();

  const handleDelete = useCallback(() => {
    setTimeout(() => {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
    }, 0);
  }, [id, setNodes]);

  return (
    <BaseNode className="w-60" selected={selected}>
      <NodeHeader>
        <NodeHeaderTitle className="flex gap-1 py-1">
          <Grid2x2 className="bg-purple-100 rounded-sm p-1" />
          {`INPUT`}
        </NodeHeaderTitle>
        <NodeHeaderActions>
          <NodeHeaderMenuAction label="Open node menu">
            <DropdownMenuItem onSelect={handleDelete}>
              <Trash />
              Delete
            </DropdownMenuItem>
          </NodeHeaderMenuAction>
        </NodeHeaderActions>
      </NodeHeader>

      <div className="flex flex-col mb-2 p-3 gap-2">
        <div className="flex gap-2">
          <Label htmlFor={productSelectTableId}>Choose Product</Label>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-3 h-3 opacity-60" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Choose the product that you going to run in this process</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <AddEditInputNodeDialog mode="edit">
          <Button variant="outline">
            <Grid2x2Plus />
            Modify Product
          </Button>
        </AddEditInputNodeDialog>
      </div>
    </BaseNode>
  );
}
