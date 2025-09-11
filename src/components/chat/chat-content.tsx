import { cn } from "@/lib/cn";
import type { FC, HTMLAttributes } from "react";

interface ChatContentProps extends HTMLAttributes<HTMLDivElement> {}

export const ChatContent: FC<ChatContentProps> = ({
  className,
  children,
  ...rest
}) => {
  return null;

  return (
    <div
      className={cn("flex flex-col max-w-3xl mx-auto h-full py-12", className)}
      {...rest}
    >
      {children}
    </div>
  );
};
