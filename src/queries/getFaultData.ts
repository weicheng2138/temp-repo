import { queryOptions } from "@tanstack/react-query";
import { request } from "@/queries/axios";

export const getFaultData = queryOptions({
  queryKey: ["fault"],
  queryFn: async () => {
    const reponse = await request.get("/users$%$%/1/todos");
    console.log(reponse);
    return reponse;

    // const result = await new Promise<{
    //   faultId: number;
    // }>((resolve, _reject) => {
    //   setTimeout(() => {
    //     // reject(new Error("Error fetching fault data"));
    //     // return;
    //     resolve({
    //       faultId: 44123,
    //     });
    //   });
    // });
    // return result;
  },
});
