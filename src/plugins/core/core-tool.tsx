import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/cn";
import { IconRobot } from "@tabler/icons-react";
import type { FC, HTMLAttributes } from "react";
import { Link } from "react-router";

interface CoreToolProps extends HTMLAttributes<HTMLDivElement> {}

export const CoreTool: FC<CoreToolProps> = ({ className, ...rest }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn("flex gap-1 items-center relative", className)}
          {...rest}
        >
          <IconRobot className="size-4" />
          <span>Plain</span>
          <Link to="/" className="absolute inset-0" />
        </div>
      </TooltipTrigger>
      <TooltipContent side="right">Start a new chat with AI</TooltipContent>
    </Tooltip>
  );
};
