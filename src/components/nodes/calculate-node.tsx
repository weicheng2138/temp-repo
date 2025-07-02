import { useCallback, useId, useMemo } from "react";
import {
  Handle,
  type Node,
  type NodeProps,
  Position,
  useReactFlow,
} from "@xyflow/react";

import { BaseNode } from "@/components/nodes/base-node";
import {
  NodeHeader,
  NodeHeaderTitle,
  NodeHeaderActions,
  NodeHeaderMenuAction,
  NodeHeaderDeleteAction,
  NodeHeaderIcon,
  NodeHeaderEditCodeAction,
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
import {
  Calculator,
  Copy,
  Info,
  Pencil,
  Rocket,
  SquareChartGantt,
  TestTubeDiagonal,
  Trash,
} from "lucide-react";
import { AddEditInputNodeDialog } from "@/components/dialogs/add-edit-input-node-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { t } from "i18next";
import { OUTPUT_DATA_TYPE } from "@/lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

export type CalculateNodeProps = Node<{
  value: number;
  label: string;
  jonbo: string;
  code: string | null;
  outputDataType: string;
  outputName: string;
}>;

export function CalculateNode({
  id,
  data,
  selected,
}: NodeProps<CalculateNodeProps>) {
  const selectDataTypeId = useId();
  const outputNameId = useId();
  const { OUTPUT_DATA_TYPE_VALUES, OUTPUT_DATA_TYPE_KV } = OUTPUT_DATA_TYPE;

  const { updateNodeData, setNodes, getNode, getNodes } =
    useReactFlow<CalculateNodeProps>();
  const currentNode = getNode(id);
  const nodes = getNodes();

  const handleDelete = useCallback(() => {
    setTimeout(() => {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
    }, 0);
  }, [id, setNodes]);

  const handleChangeOutputName = (value: string) => {
    updateNodeData(id, {
      outputName: value,
    });
  };

  const handleCreateACopy = () => {
    if (!currentNode) {
      return;
    }
    const newNodes: CalculateNodeProps[] = [];
    const maxId = nodes.reduce((acc, node) => {
      newNodes.push({
        ...node,
        selected: false,
      });
      const currentId = Number(node.id);
      if (currentId > acc) {
        acc = currentId;
      }
      return acc;
    }, 0);

    setTimeout(() => {
      setNodes([
        ...newNodes,
        {
          ...currentNode,
          id: String(maxId + 1),
          position: {
            x: currentNode.position.x + 50,
            y: currentNode.position.y + 50,
          },
        },
      ]);
    });
  };

  return (
    <BaseNode selected={selected}>
      <NodeHeader>
        <NodeHeaderTitle className="flex gap-1 py-1">
          <Calculator className="bg-green-200 rounded-sm p-1 text-gray-800" />
          {`CALCULATE`}
        </NodeHeaderTitle>
        <NodeHeaderActions>
          <NodeHeaderEditCodeAction />
          <NodeHeaderMenuAction label="Open calculate node menu">
            <DropdownMenuItem onSelect={handleDelete}>
              <Trash />
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleCreateACopy}>
              <Copy />
              Create a copy
            </DropdownMenuItem>
          </NodeHeaderMenuAction>
          {/* <AddEditInputNodeDialog */}
          {/*   inputNode={currentNode} */}
          {/*   dropdownNode={ */}
          {/*     <NodeHeaderMenuAction label="Open node menu"> */}
          {/*       <DialogTrigger className="w-full"> */}
          {/*         <DropdownMenuItem> */}
          {/*           <Pencil /> */}
          {/*           Edit */}
          {/*         </DropdownMenuItem> */}
          {/*       </DialogTrigger> */}
          {/*       <DropdownMenuItem onSelect={handleDelete}> */}
          {/*         <Trash /> */}
          {/*         Delete */}
          {/*       </DropdownMenuItem> */}
          {/*     </NodeHeaderMenuAction> */}
          {/*   } */}
          {/* /> */}
        </NodeHeaderActions>
      </NodeHeader>

      <div className="flex flex-col mb-2 p-3 gap-2">
        <div className="flex gap-2">
          <Label htmlFor={outputNameId}>Output Name</Label>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-3 h-3 opacity-60" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="w-40">The name of the table field</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Input
          value={data.outputName}
          onChange={(e) => handleChangeOutputName(e.target.value)}
        />
        <div className="flex gap-2">
          <Label htmlFor={selectDataTypeId}>Data Type</Label>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-3 h-3 opacity-60" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="w-40">
                Choose the data type for the calculate node
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Select
          value={data.outputDataType}
          onValueChange={(value) =>
            updateNodeData(id, {
              outputDataType: value,
            })
          }
        >
          <SelectTrigger id={selectDataTypeId} className="w-full">
            <SelectValue placeholder={"Output Data Type"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {OUTPUT_DATA_TYPE_VALUES.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  disabled={option === OUTPUT_DATA_TYPE_KV.DATA_TABLE}
                >
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        style={{
          width: 16,
          height: 16,
          borderWidth: 2,
          borderColor: "lightgreen",
          backgroundColor: "green",
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: 16,
          height: 16,
          borderWidth: 2,
          borderColor: "lightgreen",
          backgroundColor: "green",
        }}
      />
    </BaseNode>
  );
}
