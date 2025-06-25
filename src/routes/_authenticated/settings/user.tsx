import { createFileRoute } from "@tanstack/react-router";
import { UserDataTable } from "@/components/tables/user-data-table";
import { userSchema } from "@/queries/schema";
import { z } from "zod/v4";

export const Route = createFileRoute("/_authenticated/settings/user")({
  component: RouteComponent,
});

const data = [
  {
    id: 0,
    name: "LAIOS",
    status: 0,
  },
  {
    id: 1,
    name: "LAIOS",
    status: 1,
  },
  {
    id: 2,
    name: "LAIOS",
    status: 1,
  },
  {
    id: 3,
    name: "LAIOS",
    status: 2,
  },
  {
    id: 4,
    name: "LAIOS",
    status: 0,
  },
] satisfies z.infer<typeof userSchema>[];
function RouteComponent() {
  return (
    <div>
      <UserDataTable data={data} />
    </div>
  );
}
