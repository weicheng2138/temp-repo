import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/jobs/$processId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { processId } = Route.useParams();
  return <div>Hello "/_authenticated/jobs/$processId"!{processId}</div>;
}
