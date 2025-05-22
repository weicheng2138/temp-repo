import { createFileRoute } from "@tanstack/react-router";
import { DataTable } from "@/components/data-table";

export const Route = createFileRoute("/_authenticated/flows")({
  component: RouteComponent,
});

const data = [
  {
    id: 1,
    header: "Cover page",
    type: "Cover page",
    status: "In Process",
    target: "18",
    limit: "5",
    reviewer: "Eddie Lake",
  },
  {
    id: 2,
    header: "Table of contents",
    type: "Table of contents",
    status: "Done",
    target: "29",
    limit: "24",
    reviewer: "Eddie Lake",
  },
  {
    id: 3,
    header: "Executive summary",
    type: "Narrative",
    status: "Done",
    target: "10",
    limit: "13",
    reviewer: "Eddie Lake",
  },
];
function RouteComponent() {
  return (
    <div>
      <DataTable data={data} />
    </div>
  );
}
