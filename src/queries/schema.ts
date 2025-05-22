import { z } from "zod";

export const todoSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});
export const todoListSchema = z.array(todoSchema);

export type Todo = z.infer<typeof todoSchema>;
export type TodoList = z.infer<typeof todoListSchema>;

export const workspaceSchema = z.object({
  id: z.number().int(),
  version: z.string(),
  masterProcesses: z.array(
    z.object({
      id: z.number().int(),
      masterName: z.string(),
      processNodes: z.null(),
    }),
  ),
});
export const workspaceListSchema = z.array(workspaceSchema);

export const processNodeSchema = z.object({
  id: z.number().int(),
  nodeId: z.number().int(),
  type: z.number().int(),
  inputTableName: z.string().nullable(),
  inputVersion: z.string().nullable(),
  inputResourceGUID: z.string().nullable(),
  code: z.string().nullable(),
  outputName: z.string(),
  outputDataType: z.string(),
  previousNodes: z.array(z.number().int()).nullable(),
});

export const masterProcessSchema = z.object({
  id: z.number().int(),
  masterName: z.string(),
  processNodes: z.array(processNodeSchema),
});
