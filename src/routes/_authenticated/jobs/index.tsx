import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback, memo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { workspaceListSchema, masterProcessSchema } from "@/queries/schema";
import CodeEditor from "@/components/code-editor";

import { BaseNode } from "@/components/nodes/base-node";
import "@xyflow/react/dist/style.css";
import {
  ReactFlow,
  OnConnect,
  Position,
  useNodesState,
  useEdgesState,
  addEdge,
  Edge,
  Node,
  ReactFlowProvider,
  NodeProps,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  Background,
  ControlButton,
  Controls,
} from "@xyflow/react";
import {
  TooltipNode,
  TooltipContent,
  TooltipTrigger,
} from "@/components/nodes/tooltip-node";
import { DevTools } from "@/components/devtools";

import { NumNode } from "@/components/nodes/num-node";
import { SumNode } from "@/components/nodes/sum-node";
import { InputInfoNode } from "@/components/nodes/input-info-node";
import { CalculateNode } from "@/components/nodes/calculate-node";

import { DataEdge } from "@/components/data-edge";
import { AddEditInputNodeDialog } from "@/components/dialogs/add-edit-input-node-dialog";
import { AddEditTestDialog } from "@/components/dialogs/add-edit-test-dialog";
import { Button } from "@/components/ui/button";
import { NodeHeader } from "@/components/node-header";
import { NODE_TYPES } from "@/lib/constants";
import { Rocket } from "lucide-react";
import CreateNodeButton from "@/components/create-node-button";

const { NODE_TYPES_KV } = NODE_TYPES;
const nodeTypes = {
  inputInfo: memo(InputInfoNode),
  calculate: memo(CalculateNode),
  num: memo(NumNode),
  sum: memo(SumNode),
  // tooltip: memo(({ selected }: NodeProps) => {
  //   return (
  //     <TooltipNode selected={selected}>
  //       <TooltipContent position={Position.Right}>
  //         Hidden Content
  //       </TooltipContent>
  //       <TooltipTrigger>Hover</TooltipTrigger>
  //     </TooltipNode>
  //   );
  // }),
};

const edgesTypes = {
  data: DataEdge,
};

const initialNodes: Node[] = [
  // {
  //   id: "a",
  //   type: "output",
  //   data: { value: 1, label: "one" },
  //   position: { x: 100, y: 100 },
  // },
  // {
  //   id: "b",
  //   type: "num",
  //   data: { value: 2, label: "two" },
  //   position: { x: 300, y: 0 },
  // },
  // {
  //   id: "c",
  //   type: "sum",
  //   data: { value: 3, label: "three" },
  //   position: { x: 300, y: 100 },
  // },
  // {
  //   id: "d",
  //   type: "num",
  //   data: { value: 4, label: "four" },
  //   position: { x: 0, y: 400 },
  // },
  // {
  //   id: "e",
  //   type: "sum",
  //   data: { value: 5, label: "five" },
  //   position: { x: 600, y: 400 },
  // },
  {
    id: "input-id",
    type: NODE_TYPES_KV.INPUT_INFO,
    data: {
      value: 2,
      label: "two",
      code: null,
      outputDataType: "DataTable",
      inputProperties: [],
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "calculate-id1",
    type: NODE_TYPES_KV.CALCULATE,
    data: {
      value: 1,
      label: "one",
      code: "WCA9IFBST19BQUEgKyBQUk9fQkJC",
      outputDataType: "int",
      outputName: "X",
    },
    position: { x: 300, y: 0 },
  },
  {
    id: "calculate-id2",
    type: NODE_TYPES_KV.CALCULATE,
    data: {
      value: 2,
      label: "two",
      code: "WCA9IFBST19BQUEgKyBQUk9fQkJC",
      outputDataType: "int",
      outputName: "Y",
    },
    position: { x: 300, y: 200 },
  },
];

const initialEdges: Edge[] = [
  {
    id: "1->2",
    source: "calculate-id1",
    target: "calculate-id2",
  },
  // {
  //   id: "a->b",
  //   source: "a",
  //   target: "b",
  //   sourceHandle: "id-top",
  // },
  // {
  //   id: "a->c",
  //   type: "data",
  //   data: { key: "value" },
  //   source: "a",
  //   target: "c",
  //   targetHandle: "x",
  // },
  // {
  //   id: "b->c",
  //   type: "data",
  //   data: { key: "value" },
  //   source: "b",
  //   target: "c",
  //   targetHandle: "y",
  // },
  // {
  //   id: "c->e",
  //   type: "data",
  //   data: { key: "value" },
  //   source: "c",
  //   target: "e",
  //   targetHandle: "x",
  // },
  // {
  //   id: "d->e",
  //   type: "data",
  //   data: { key: "value" },
  //   source: "d",
  //   target: "e",
  //   targetHandle: "y",
  // },
];

export const Route = createFileRoute("/_authenticated/jobs/")({
  component: RouteComponent,
});

const process = {
  id: 1,
  masterName: "L_XXX0001-2",
  processNodes: [
    {
      id: 1,
      nodeId: 1,
      type: 0,
      inputTableName: "Name",
      inputVersion: "20250102",
      inputResourceGUID: "bfdfsdfsd-sdfsd-fds",
      code: null,
      outputName: "Input",
      outputDataType: "DataTable",
      previousNodes: null,
    },
  ],
};
function RouteComponent() {
  const { t } = useTranslation();
  const [workspaceId, setWorkspaceId] = useState("");
  const [masterProcessId, setMasterProcessId] = useState("");
  const [code, setCode] = useState<string | undefined>(undefined);
  const [processOptions, setProcessOptions] = useState<
    { id: number; name: string }[]
  >([]);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { data: workspacesData } = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const tempPromise = new Promise((resolve) => {
        const data = [
          {
            id: 1,
            version: "20250102",
            masterProcesses: [
              {
                id: 1,
                masterName: "L_XXX0001-2",
                processNodes: null,
              },
              {
                id: 2,
                masterName: "L_XXX0001-3",
                processNodes: null,
              },
            ],
          },
          {
            id: 2,
            version: "20250304",
            masterProcesses: [
              {
                id: 1,
                masterName: "L_XXX321",
                processNodes: null,
              },
              {
                id: 2,
                masterName: "L_XXX123",
                processNodes: null,
              },
            ],
          },
        ];
        resolve(data);
      });

      const response = await tempPromise;
      const result = workspaceListSchema.safeParse(response);
      if (!result.success) {
        console.error(result.error);
        return null;
      }
      return result.data;
    },
  });

  const { data: currentProcess, isFetching: isFetchingProcess } = useQuery({
    queryKey: ["currentProcess", masterProcessId],
    queryFn: async () => {
      const tempPromise = new Promise((resolve) => {
        setTimeout(() => {
          resolve(process);
        }, 2000);
      });
      const response = await tempPromise;
      const result = masterProcessSchema.safeParse(response);
      if (!result.success) {
        console.error(result.error);
        return null;
      }
      return result.data;
    },
    enabled: !!masterProcessId,
  });

  // Handle workspace and master process selection
  useEffect(() => {
    if (!workspacesData || !workspaceId) return;
    setMasterProcessId("");
    const targetWorkspace = workspacesData.find(
      (el) => el.id === parseInt(workspaceId),
    );
    if (targetWorkspace) {
      const masterProcesses = targetWorkspace.masterProcesses.map((el) => {
        return {
          id: el.id,
          name: el.masterName,
        };
      });
      setProcessOptions(masterProcesses);
    }
  }, [workspacesData, workspaceId]);

  const onConnect: OnConnect = useCallback(
    (params) => {
      setEdges((edges) =>
        addEdge({ type: "data", data: { key: "value" }, ...params }, edges),
      );
    },
    [setEdges],
  );

  return (
    <div className="flex flex-col gap-2 p-2">
      <section className="flex gap-2">
        <Select
          value={workspaceId}
          onValueChange={(value) => setWorkspaceId(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("jobs.workspace")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t("jobs.workspace")}</SelectLabel>
              {workspacesData &&
                workspacesData.map((option) => (
                  <SelectItem key={option.id} value={String(option.id)}>
                    {option.version}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={masterProcessId}
          onValueChange={(value) => setMasterProcessId(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("jobs.master-process")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t("jobs.master-process")}</SelectLabel>
              {processOptions.map((option) => (
                <SelectItem key={option.id} value={String(option.id)}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <CreateNodeButton />
      </section>
      {/* <section className="flex gap-2 flex-col text-wrap"> */}
      {/*   {isFetchingProcess && <p>Loading...</p>} */}
      {/*   {!isFetchingProcess && currentProcess && JSON.stringify(currentProcess)} */}
      {/*   {!isFetchingProcess && !currentProcess && "No Master Process"} */}
      {/* </section> */}
      <section>
        {/* <CodeEditor code={code} onChange={setCode} /> */}

        {/* <AddEditInputNodeDialog inputNode={initialNodes[0]}> */}
        {/*   <Button>OPEN</Button> */}
        {/* </AddEditInputNodeDialog> */}
        {/* <AddEditTestDialog inputNode={initialNodes[0]}> */}
        {/*   <Button>TEST DIALOG</Button> */}
        {/* </AddEditTestDialog> */}

        {/* <div className="p-8 h-[400px] w-full"> */}
        {/* <BaseNode selected={false}>Hi! 👋</BaseNode> */}
        {/* <ReactFlow */}
        {/*   defaultNodes={[ */}
        {/*     { */}
        {/*       id: "1", */}
        {/*       position: { x: 200, y: 200 }, */}
        {/*       data: {}, */}
        {/*       type: "tooltip", */}
        {/*     }, */}
        {/*   ]} */}
        {/*   nodeTypes={nodeTypes} */}
        {/*   fitView */}
        {/* /> */}
        {/* </div> */}
        <div className="h-[calc(100vh-140px)] w-full rounded-md">
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              edgeTypes={edgesTypes}
              defaultEdgeOptions={{
                animated: true,
              }}
              fitView
            >
              <Controls showZoom={false}>
                <ControlButton
                  onClick={() => alert("Something magical just happened. ✨")}
                >
                  <Rocket />
                </ControlButton>
              </Controls>
              <DevTools position="top-left" />
              <Background />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </section>
    </div>
  );
}
