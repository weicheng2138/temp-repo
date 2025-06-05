import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { getTodos, createTodo, getPosts } from "@/queries/request-usage";
import {
  useQuery,
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useAuth } from "@/store/auth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useMemo, useReducer, useRef } from "react";
import { searchParamsSchema, type SearchParams } from "@/queries/schema";
import { usePagination } from "@/hooks/use-pagination";

// You can load data over route loader
export const Route = createFileRoute("/_authenticated/request-usage")({
  component: RouteComponent,
  validateSearch: (search) => searchParamsSchema.parse(search),
  // loader: async ({ context: { queryClient } }) => {
  //   const response = queryClient.ensureQueryData(getTodos);
  //   console.log("res from api-usage", response);
  //   return response;
  // },
});

const initialState: SearchParams = {
  start: 0,
  limit: 5,
};

type ACTION_TYPES =
  | { type: "next" }
  | { type: "prev" }
  | { type: "change-limit"; payload: number };

const paginationReducer = (
  state: typeof initialState,
  action: ACTION_TYPES,
) => {
  switch (action.type) {
    case "next":
      return {
        ...state,
        start: state.start + 1,
      };
    case "prev": {
      const newStart = state.start - 1;
      return {
        ...state,
        start: newStart <= 0 ? 0 : newStart,
      };
    }
    case "change-limit":
      return {
        ...state,
        limit: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
};

function RouteComponent() {
  const queryClient = useQueryClient();
  // const [state, dispatch] = useReducer(paginationReducer, initialState);
  const searchParams = Route.useSearch();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["get-posts", searchParams],
    queryFn: () => getPosts(searchParams),
  });
  const lastKnownTotalRef = useRef<number>(0);
  const totalPages = useMemo(() => {
    if (posts) {
      // const calculatedTotal = Math.ceil(posts.total / searchParams.limit);
      const calculatedTotal = posts.total - searchParams.limit + 1;
      lastKnownTotalRef.current = calculatedTotal;
      return calculatedTotal;
    }
    return lastKnownTotalRef.current;
  }, [posts, searchParams.limit]);
  const navigate = useNavigate({ from: Route.fullPath });

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

  console.log("totalPages", totalPages);
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage: searchParams.start + 1,
    totalPages,
    paginationItemsToDisplay: 5,
  });
  const handleRefetch = () => {
    queryClient.invalidateQueries({
      queryKey: getTodos.queryKey,
    });
  };
  return (
    <div className="flex flex-col gap-2 p-2">
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
      {/* <section className="flex gap-2 items-center"> */}
      {/*   <p>REDUCER: </p> */}
      {/*   <Button */}
      {/*     disabled={state.start === 0} */}
      {/*     onClick={() => dispatch({ type: "prev" })} */}
      {/*   > */}
      {/*     Prev */}
      {/*   </Button> */}
      {/*   <Button onClick={() => dispatch({ type: "next" })}>Next</Button> */}
      {/*   <Button onClick={() => dispatch({ type: "change-limit", payload: 10 })}> */}
      {/*     Limit to 10 */}
      {/*   </Button> */}
      {/* </section> */}
      <section className="flex gap-2 items-center">
        <p>ROUTER LINK: </p>
        <Button
          disabled={searchParams.start === 0}
          onClick={() =>
            navigate({
              search: (prev) => ({
                ...prev,
                start: prev.start - 1 < 0 ? 0 : prev.start - 1,
              }),
            })
          }
        >
          Prev
        </Button>
        <Link
          from="/request-usage"
          search={(prev) => ({ ...prev, start: prev.start + 1 })}
        >
          <Button>Next</Button>
        </Link>
        <Button
          onClick={() =>
            navigate({ search: (prev) => ({ ...prev, limit: 10 }) })
          }
        >
          Limit to 10
        </Button>
      </section>
      <section className="flex gap-2 items-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Link
                disabled={searchParams.start === 0}
                from="/request-usage"
                search={(prev) => ({
                  ...prev,
                  start: prev.start - 1 < 0 ? 0 : prev.start - 1,
                })}
              >
                <PaginationPrevious disabled={searchParams.start === 0} />
              </Link>
            </PaginationItem>
            {/* Left ellipsis (...) */}
            {showLeftEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {/* Page number links */}
            {pages.map((page) => (
              <PaginationItem key={page}>
                <Link
                  from="/request-usage"
                  search={(prev) => ({ ...prev, start: page - 1 })}
                >
                  <PaginationLink isActive={searchParams.start === page - 1}>
                    {page}
                  </PaginationLink>
                </Link>
              </PaginationItem>
            ))}
            {/* Right ellipsis (...) */}
            {showRightEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <Link
                disabled={searchParams.start >= totalPages - 1}
                from="/request-usage"
                search={(prev) => ({ ...prev, start: prev.start + 1 })}
              >
                <PaginationNext
                  disabled={searchParams.start >= totalPages - 1}
                />
              </Link>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
      <p>{isLoading && "Fetching..."}</p>
      <p>{posts ? JSON.stringify(posts.data) : "NO DATA"}</p>
    </div>
  );
}
