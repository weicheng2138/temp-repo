import { createFileRoute } from "@tanstack/react-router";
import { getPosts } from "@/queries/getPosts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useAuth } from "@/store/auth";

export const Route = createFileRoute("/about")({
  component: About,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(getPosts);
  },
  errorComponent: () => <div className="text-red-300">Error...</div>,
});

function About() {
  const { data } = useSuspenseQuery(getPosts);
  const { isLogin } = useAuth();
  return (
    <>
      <div className="p-2">{JSON.stringify(data)}</div>
      <div>{isLogin ? "Yes" : "No"}</div>
    </>
  );
}
