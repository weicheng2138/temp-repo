import { useEffect } from "react";
import {
  type Node,
  type NodeProps,
  Position,
  useReactFlow,
  useStore,
} from "@xyflow/react";

import { BaseNode } from "@/components/nodes/base-node";
import { LabeledHandle } from "@/components/labeled-handle";
import { NodeHeader, NodeHeaderTitle } from "@/components/node-header";

export type SumNode = Node<{
  value: number;
}>;

export function SumNode({ id }: NodeProps<SumNode>) {
  const { updateNodeData, getNodeConnections } = useReactFlow();
  const { x, y } = useStore((state) => ({
    x: getHandleValue(
      getNodeConnections({ nodeId: id, handleId: "x", type: "target" }),
      state.nodeLookup,
    ),
    y: getHandleValue(
      getNodeConnections({ nodeId: id, handleId: "y", type: "target" }),
      state.nodeLookup,
    ),
  }));

  useEffect(() => {
    updateNodeData(id, { value: x + y });
  }, [x, y]);

  return (
    <BaseNode className="w-32">
      <NodeHeader>
        <NodeHeaderTitle>Sum</NodeHeaderTitle>
      </NodeHeader>

      <footer className="bg-gray-100 -m-5">
        <LabeledHandle
          title="x"
          id="x"
          type="target"
          position={Position.Left}
        />
        <LabeledHandle
          title="y"
          id="y"
          type="target"
          position={Position.Left}
        />
        <LabeledHandle title="out" type="source" position={Position.Right} />
      </footer>
    </BaseNode>
  );
}

function getHandleValue(
  connections: Array<{ source: string }>,
  lookup: Map<string, Node>,
) {
  return connections.reduce((acc, { source }) => {
    const node = lookup.get(source)!;
    const value = node.data.value;

    return typeof value === "number" ? acc + value : acc;
  }, 0);
}
