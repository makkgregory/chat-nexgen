import { cn } from "@/lib/cn";
import { type FC, type HTMLAttributes } from "react";

interface ChatRootProps extends HTMLAttributes<HTMLDivElement> {}

export const ChatRoot: FC<ChatRootProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={cn("size-full", className)} {...rest}>
      {children}
    </div>
  );
};
