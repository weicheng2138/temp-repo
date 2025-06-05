import { RouterProvider, createRouter, Link } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import PageLoader from "@/components/page-loader";
import PageNotFound from "./components/page-not-found";
// import { useAuth } from "@/hooks/useAuth";
import { useAuth } from "@/store/auth";
import { ThemeProvider } from "@/components/theme-provider";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a client for react-query
const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPendingComponent: PageLoader,
  context: {
    queryClient,
    authentication: undefined!,
  },
  defaultPendingMinMs: 0,
  defaultPendingMs: 0,
  defaultNotFoundComponent: PageNotFound,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
export default function App() {
  const authentication = useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />
        <RouterProvider
          router={router}
          context={{ authentication: authentication }}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
