import { useEffect } from "react";
import { CircleSlash } from "lucide-react";
import { ErrorComponentProps, useRouter } from "@tanstack/react-router";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Button } from "./ui/button";
function PageError({ reset }: ErrorComponentProps) {
  const router = useRouter();
  const queryErrorResetBoundary = useQueryErrorResetBoundary();
  const handleReset = () => {
    reset();
    router.invalidate();
  };

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return (
    <div className="flex flex-col gap-6 items-center justify-center h-[calc(100svh)] bg-orange-200">
      <div className="relative h-6 w-6">
        <CircleSlash className="absolute text-red-400" />
        <CircleSlash className="absolute animate-ping text-red-400" />
      </div>
      <Button onClick={handleReset}>Refresh The Page</Button>
    </div>
  );
}

export default PageError;
