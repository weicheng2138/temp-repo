import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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

  return (
    <div className="flex flex-col gap-2">
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
          <SelectTrigger className="w-full">
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
      </section>
      <section className="flex gap-2 flex-col text-wrap">
        {isFetchingProcess && <p>Loading...</p>}
        {!isFetchingProcess && currentProcess && JSON.stringify(currentProcess)}
        {!isFetchingProcess && !currentProcess && "No Master Process"}
      </section>
      <section>
        <CodeEditor code={code} onChange={setCode} />
      </section>
    </div>
  );
}
