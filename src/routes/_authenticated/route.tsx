import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import ErrorPage from "@/components/page-error";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const { isLogin } = context.authentication;
    if (!isLogin) {
      console.log("redirect");
      throw redirect({
        to: "/",
      });
    }

    // console.log("isAuthenticated", isAuthenticated());
    // if (!isAuthenticated()) {
    //   console.log("redirect");
    //   throw new Error("Not authenticated");
    //   throw redirect({
    //     to: "/",
    //   });
    // }
  },
  component: RouteLayout,
  errorComponent: ErrorPage,
});

function RouteLayout() {
  return (
    <div className="pt-12 px-4 pb-12">
      <h1>authenticated Layout</h1>
      <Outlet />
    </div>
  );
}
