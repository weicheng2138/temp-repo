import { createFileRoute } from "@tanstack/react-router";
import { getPostDetail } from "@/queries/getPostDetail";

export const Route = createFileRoute("/posts/$postId")({
  component: RouteComponent,
  loader: async ({ params, context: { queryClient } }) => {
    const postDetail = await queryClient.ensureQueryData(
      getPostDetail(params.postId),
    );
    return {
      postId: params.postId,
      postDetail,
    };
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div className="text-red-300">Error...</div>,
});

function RouteComponent() {
  const { postId, postDetail } = Route.useLoaderData();
  return (
    <div>
      <h1>{`Hello /posts/!${postId}`}</h1>
      <p>{JSON.stringify(postDetail)}</p>
    </div>
  );
}
