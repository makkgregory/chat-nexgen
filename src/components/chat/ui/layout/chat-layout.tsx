import { ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/cn";
import type { ComponentProps, FC } from "react";

interface ChatLayoutProps extends ComponentProps<typeof ResizablePanelGroup> {}

export const ChatLayout: FC<ChatLayoutProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <ResizablePanelGroup className={cn("", className)} {...rest}>
      {children}
    </ResizablePanelGroup>
  );
};
