import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/jobs")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div>
      <h1>Jobs Layout Scope</h1>
      <Outlet />
    </div>
  );
}
