import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { type AuthState } from "@/store/auth";

type RouterContext = {
  authentication: AuthState;
  queryClient: QueryClient;
};
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    return (
      <div className="relative">
        <main>
          <Outlet />
        </main>
        {/* <TanStackRouterDevtools /> */}
      </div>
    );
  },
});
