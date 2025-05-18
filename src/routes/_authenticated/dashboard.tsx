import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/store/auth";
import { ModeToggle } from "@/components/mode-toggle";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isLogin, userInfo } = useAuth();
  return (
    <div>
      <p>Hello "/_authenticated/dashboard"! {`${isLogin ? "YES" : "No"}`}</p>
      <p>{userInfo}</p>
      <ModeToggle />
    </div>
  );
}
