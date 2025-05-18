import { queryOptions } from "@tanstack/react-query";

export const getPosts = queryOptions({
  queryKey: ["posts"],
  queryFn: async () => {
    const posts = ["PostA", "PostB", "PostC"];
    const result = await new Promise<string[]>((resolve) => {
      setTimeout(() => {
        resolve(posts);
      }, 5000);
    });
    return result;
  },
});
