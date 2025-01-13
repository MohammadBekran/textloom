import {
  Tooltip as ShadTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ITooltipProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const Tooltip = ({ trigger, children }: ITooltipProps) => {
  return (
    <TooltipProvider>
      <ShadTooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent>{children}</TooltipContent>
      </ShadTooltip>
    </TooltipProvider>
  );
};

export default Tooltip;
