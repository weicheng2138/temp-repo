import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
  validateSearch: (search) => {
    return {
      q: (search.q as string) || "",
    };
  },
  loaderDeps: ({ search: { q } }) => ({ q }),
  loader: async ({ deps }) => {
    const posts = ["USA00001", "USA00002", "USA00003"];
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const postsFromPlaceholder = await response.json();
    return {
      posts: deps.q === "" ? posts : posts.filter((post) => post === deps.q),
      postsFromPlaceholder,
    };
  },
});

function RouteComponent() {
  const { posts, postsFromPlaceholder } = Route.useLoaderData();
  // const { q } = Route.useSearch();

  return (
    <div>
      <h3>Posts</h3>
      <ul>
        {posts.map((post) => (
          <Link
            key={post}
            to="/posts/$postId"
            params={{
              postId: post,
            }}
            className="px-1"
          >
            {post}
          </Link>
        ))}
      </ul>
      <p>{JSON.stringify(postsFromPlaceholder)}</p>
    </div>
  );
}
