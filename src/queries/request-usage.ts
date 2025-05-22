import { queryOptions } from "@tanstack/react-query";
import { request } from "@/queries/axios";
import { todoListSchema } from "@/queries/schema";

export const getTodos = queryOptions({
  queryKey: ["todos"],
  queryFn: async () => {
    const response = await request.get("/users/2/todos");
    const parseResult = todoListSchema.safeParse(response.data);
    if (parseResult.success === false) {
      console.error("zod parse error", parseResult.error);
      return null;
    }
    return parseResult.data;
  },
});

export async function createTodo(payload: {
  title: string;
  body: string;
  userId: number;
}) {
  const response = await request.post("/postseeee", payload);
  return response.data;
}
