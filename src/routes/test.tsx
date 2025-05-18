import { use, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const dataPromise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    reject("Something went wrong");
    // resolve("👌 Data Loaded");
  }, 2000);
}).catch((error) => `⚠️ ${error}`);

const searchParamsSchema = z.object({
  page: z.coerce.number().positive().int().catch(1),
  filter: z.string().optional(),
  sort: z.enum(["newest", "oldest", "price"]).catch("newest"),
});

export const Route = createFileRoute("/test")({
  component: RouteComponent,
  validateSearch: (search) => searchParamsSchema.parse(search),
  loader: () => {
    return { dataPromise };
  },
});

function RouteComponent() {
  console.log("RouteComponent");
  const { filter, page, sort } = Route.useSearch();
  return (
    <div className="pt-12">
      <p>{`${filter} ${page} ${sort}`}</p>
      <Suspense fallback={<div>Loading...</div>}>
        <DataComponent />
      </Suspense>
    </div>
  );
}

function DataComponent() {
  console.log("DataComponent");
  const { dataPromise } = Route.useLoaderData();
  const result = use(dataPromise);
  return <div>{result}</div>;
}
