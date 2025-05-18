import { queryOptions } from "@tanstack/react-query";

export const getPostDetail = (postId: string) =>
  queryOptions({
    queryKey: ["post", postId],
    queryFn: async () => {
      const result = await new Promise<{
        id: string;
        title: string;
        content: string;
      }>((resolve) => {
        setTimeout(() => {
          switch (postId) {
            case "USA00001":
              resolve({
                id: "USA00001",
                title: "Post A",
                content: "This is the content of Post A",
              });
              break;
            case "USA00002":
              resolve({
                id: "USA00002",
                title: "Post B",
                content: "This is the content of Post B",
              });
              break;
            case "USA00003":
              resolve({
                id: "USA00003",
                title: "Post C",
                content: "This is the content of Post C",
              });
              break;
            default:
              resolve({
                id: "No",
                title: "No",
                content: "Nothing",
              });
              break;
          }
        }, 5000);
      });
      return result;
    },
  });
