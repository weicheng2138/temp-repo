import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
// import { AuthContext } from "@/hooks/useAuth";
import { type AuthState } from "@/store/auth";

type RouterContext = {
  authentication: AuthState;
  queryClient: QueryClient;
};
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    return (
      <div className="relative">
        <div className="fixed z-50 p-2 flex gap-2 h-12 w-full justify-center items-center border-b-gray-500 border-b-1 bg-background">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
          <Link to="/calendar" className="[&.active]:font-bold">
            Calendar
          </Link>
          <Link
            search={{
              sort: "newest",
              page: 1,
            }}
            to="/test"
            className="[&.active]:font-bold"
          >
            Test
          </Link>
          <Link
            to="/posts"
            search={{
              q: "",
            }}
            className="[&.active]:font-bold"
          >
            Posts
          </Link>
          <Link to="/dashboard" className="[&.active]:font-bold">
            Dashboard
          </Link>
        </div>
        <main>
          <Outlet />
        </main>
        <TanStackRouterDevtools />
      </div>
    );
  },
});
