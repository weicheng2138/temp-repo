import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/calendar")({
  component: CalendarPage,
});

function CalendarPage() {
  return <div className="">{"Calendar Old"}</div>;
}
