import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/cn";
import { IconInfinity } from "@tabler/icons-react";
import type { FC, HTMLAttributes } from "react";
import { Link } from "react-router";

interface AgentModeToolProps extends HTMLAttributes<HTMLDivElement> {}

export const AgentModeTool: FC<AgentModeToolProps> = ({
  className,
  ...rest
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn("flex gap-1 items-center relative", className)}
          {...rest}
        >
          <IconInfinity className="size-4" />
          <span>Agent mode</span>
          <Link to="/collections/chat" className="absolute inset-0" />
        </div>
      </TooltipTrigger>
      <TooltipContent side="right">
        Query your data with natural language
      </TooltipContent>
    </Tooltip>
  );
};
