import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/cn";
import type { FC, HTMLAttributes } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
interface TokenCounterProps extends HTMLAttributes<HTMLDivElement> {}

export const TokenCounter: FC<TokenCounterProps> = ({ className, ...rest }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "absolute top-2 right-2 p-0.5 hover:bg-muted rounded",
            className
          )}
          {...rest}
        >
          <CircularProgressbar
            value={50}
            strokeWidth={12}
            classes={{
              background: "",
              text: "",
              root: "size-5",
              path: "stroke-green-500",
              trail: "stroke-muted",
            }}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <ul>
          <li>Token total: 1234</li>
          <li>Token limit: 4096</li>
          <li>Model: gpt-3.5-turbo</li>
        </ul>
      </TooltipContent>
    </Tooltip>
  );
};
