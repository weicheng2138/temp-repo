import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
function PageNotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-[calc(100svh-64px)]">
      <div className="flex gap-4 items-center">
        <h1 className="text-3xl font-bold border-r border-r-gray-400 pr-4">
          404
        </h1>
        <span className="text-md">Page Not Found</span>
      </div>
      <Link to="/">
        <Button variant="secondary">Back Home</Button>
      </Link>
    </div>
  );
}

export default PageNotFound;
