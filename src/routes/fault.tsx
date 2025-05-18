import { createFileRoute } from "@tanstack/react-router";
import PageError from "@/components/page-error";
import { getFaultData } from "@/queries/getFaultData";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/fault")({
  component: RouteComponent,
  errorComponent: PageError,
});

function RouteComponent() {
  const { data } = useSuspenseQuery(getFaultData);
  return (
    <div>
      <h1>FAULT PAGE</h1>
      <p>{`Hello /fault/${data.faultId}`}</p>
    </div>
  );
}
