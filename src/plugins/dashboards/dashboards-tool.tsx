import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/cn";
import { IconLayoutDashboard } from "@tabler/icons-react";
import type { FC, HTMLAttributes } from "react";
import { Link } from "react-router";

interface DashboardsToolProps extends HTMLAttributes<HTMLDivElement> {}

export const DashboardsTool: FC<DashboardsToolProps> = ({
  className,
  ...rest
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={cn("flex gap-1 items-center", className)} {...rest}>
          <IconLayoutDashboard className="size-4" />
          <span>Dashboards</span>
          <Link to="/dashboards/chat" className="absolute inset-0" />
        </div>
      </TooltipTrigger>
      <TooltipContent side="right">
        Query your data with natural language
      </TooltipContent>
    </Tooltip>
  );
};
