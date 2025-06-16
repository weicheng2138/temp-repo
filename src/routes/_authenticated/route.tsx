import {
  createFileRoute,
  redirect,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import ErrorPage from "@/components/page-error";
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import type { LocaleRouteType } from "@/i18n";
import { FileRouteTypes } from "@/routeTree.gen";
import { Fragment } from "react";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const { isLogin } = context.authentication;
    if (!isLogin) {
      throw redirect({
        to: "/",
      });
    }
  },
  // loader: ({ location }) => {
  //   console.warn("Route loader params", location);
  //   const rawBreadcrumbs = location.pathname
  //     .split("/")
  //     .filter((name) => name !== "");
  //   const breadcrumbs = rawBreadcrumbs.reduce(
  //     (acc, _name, index) => {
  //       let localeKey = "" as LocaleRouteType;
  //       let path = "" as FileRouteTypes["to"];
  //       for (let i = 0; i <= index; i++) {
  //         if (i === 0) {
  //           localeKey += rawBreadcrumbs[i];
  //           path += "/" + rawBreadcrumbs[i];
  //           continue;
  //         }
  //         localeKey += `-${rawBreadcrumbs[i]}`;
  //         path += `/${rawBreadcrumbs[i]}`;
  //       }
  //       acc.push({
  //         path,
  //         localeKey,
  //       });
  //       return acc;
  //     },
  //     [] as {
  //       path: FileRouteTypes["to"];
  //       localeKey: LocaleRouteType;
  //     }[],
  //   );
  //   return {
  //     breadcrumbs,
  //   };
  // },
  component: RouteLayout,
  errorComponent: ErrorPage,
});

function RouteLayout() {
  const { t } = useTranslation("route");
  const matches = useRouterState({
    select: (s) => s.matches,
  });
  const temp = matches.filter((match) => match.fullPath !== "/");
  // const { breadcrumbs } = Route.useLoaderData();
  const breadcrumbs = temp.map((el) => {
    const splitted = el.fullPath.split("/");
    if (splitted.length === 2) {
      return {
        id: el.id,
        path: el.fullPath as FileRouteTypes["to"],
        label: t(splitted[1] as LocaleRouteType),
      };
    }
    if (splitted.length === 3 && splitted[2].startsWith("$")) {
      return {
        id: el.id,
        path: null,
        label: el.id.split("/").pop(),
      };
    }
    return {
      id: el.id,
      path: null,
      label: null,
    };
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((item, index) => {
                  if (item.path) {
                    return (
                      <Fragment key={item.id}>
                        {index !== 0 && (
                          <BreadcrumbSeparator className="hidden md:block" />
                        )}
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink asChild>
                            <Link
                              to={item.path}
                              // params={{ processId: "123456" }}
                            >
                              {item.label}
                            </Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                      </Fragment>
                    );
                  }
                  if (item.label === null) {
                    return;
                  }
                  return (
                    <Fragment key={item.id}>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <Outlet />
        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0"> */}
        {/*   <div className="grid auto-rows-min gap-4 md:grid-cols-3"> */}
        {/*     <div className="aspect-video rounded-xl bg-muted/50" /> */}
        {/*     <div className="aspect-video rounded-xl bg-muted/50" /> */}
        {/*     <div className="aspect-video rounded-xl bg-muted/50" /> */}
        {/*   </div> */}
        {/*   <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
        {/* </div> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
