import { Loader } from "lucide-react";
function PageLoader() {
  return (
    <div className="flex items-center justify-center h-[calc(100svh-50px)]">
      <Loader className="animate-spin" />
    </div>
  );
}

export default PageLoader;
