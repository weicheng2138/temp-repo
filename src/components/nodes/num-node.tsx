import { useCallback } from "react";
import {
  Handle,
  type Node,
  type NodeProps,
  Position,
  useReactFlow,
} from "@xyflow/react";

import { BaseNode } from "@/components/nodes/base-node";
import { LabeledHandle } from "@/components/labeled-handle";
import {
  NodeHeader,
  NodeHeaderTitle,
  NodeHeaderActions,
  NodeHeaderMenuAction,
  NodeHeaderDeleteAction,
  NodeHeaderIcon,
} from "@/components/node-header";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Pencil, Rocket, TestTubeDiagonal, Trash } from "lucide-react";
import { AddEditInputNodeDialog } from "@/components/dialogs/add-edit-input-node-dialog";
import { DialogTrigger } from "@/components/ui/dialog";

export type NumNode = Node<{
  value: number;
  label: string;
}>;

export function NumNode({ id, data }: NodeProps<NumNode>) {
  const { updateNodeData, setNodes, getNode } = useReactFlow();
  const currentNode = getNode(id);

  const handleReset = useCallback(() => {
    updateNodeData(id, { value: 0 });
  }, [id, updateNodeData]);

  const handleDelete = useCallback(() => {
    setTimeout(() => {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
    }, 0);
  }, [id, setNodes]);

  const handleIncr = useCallback(() => {
    updateNodeData(id, { value: data.value + 1 });
  }, [id, data.value, updateNodeData]);

  const handleDecr = useCallback(() => {
    updateNodeData(id, { value: data.value - 1 });
  }, [id, data.value, updateNodeData]);

  return (
    <BaseNode>
      <NodeHeader>
        {/* <NodeHeaderIcon> */}
        {/*   <TestTubeDiagonal /> */}
        {/* </NodeHeaderIcon> */}
        <NodeHeaderTitle>{`Node Name ${data.label}`}</NodeHeaderTitle>
        <NodeHeaderActions>
          <AddEditInputNodeDialog
            inputNode={currentNode}
            dropdownNode={
              <NodeHeaderMenuAction label="Open node menu">
                <DialogTrigger className="w-full">
                  <DropdownMenuItem>
                    <Pencil />
                    Edit
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem onSelect={handleDelete}>
                  <Trash />
                  Delete
                </DropdownMenuItem>
              </NodeHeaderMenuAction>
            }
          />
        </NodeHeaderActions>
      </NodeHeader>

      <div className="flex gap-2 items-center mb-10">
        {/* <Button onClick={handleDecr}>-</Button> */}
        <pre>{String(data.value).padStart(3, " ")}</pre>
        {/* <Button onClick={handleIncr}>+</Button> */}
      </div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Top} id={"id-top"} />
      <Handle type="source" position={Position.Top} id={"id-top"} />
    </BaseNode>
  );
}
