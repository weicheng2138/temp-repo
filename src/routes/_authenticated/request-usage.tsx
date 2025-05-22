import { createFileRoute } from "@tanstack/react-router";
import { getTodos, createTodo } from "@/queries/request-usage";
import {
  useQuery,
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useAuth } from "@/store/auth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// You can load data over route loader
export const Route = createFileRoute("/_authenticated/request-usage")({
  component: RouteComponent,
  // loader: async ({ context: { queryClient } }) => {
  //   const response = queryClient.ensureQueryData(getTodos);
  //   console.log("res from api-usage", response);
  //   return response;
  // },
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { data, isFetching, error } = useQuery(getTodos);
  const { mutate, isPending } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      toast("SUCCESS CREATED");
    },
  });
  const { isLogin, logout } = useAuth();
  // const { data, status } = useSuspenseQuery(getFaultData);
  // const { data } = Route.useLoaderData();
  const handleRefetch = () => {
    queryClient.invalidateQueries({
      queryKey: getTodos.queryKey,
    });
  };
  return (
    <div className="flex flex-col gap-2">
      Hello "/_authenticated/request-usage"!
      <Button disabled={isFetching} onClick={handleRefetch}>
        {isFetching ? "LOADING..." : "REFETCH"}
      </Button>
      <Button
        disabled={isPending}
        onClick={() =>
          mutate({
            title: "joo",
            body: "test",
            userId: 2,
          })
        }
      >
        {isPending ? "LOADING..." : "CREATE"}
      </Button>
      <p>{data ? JSON.stringify(data) : "NO DATA"}</p>
    </div>
  );
}
