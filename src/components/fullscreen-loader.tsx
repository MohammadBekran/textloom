import { LoaderIcon } from "lucide-react";

const FullScreenLoader = ({ label }: { label?: string }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-2">
      <LoaderIcon className="size-6 text-muted-foreground animate-spin" />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
};

export default FullScreenLoader;
