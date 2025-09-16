import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { cn } from "@/lib/cn";
import type { ComponentProps, FC } from "react";

interface ChatMainProps extends ComponentProps<typeof ResizablePanel> {}

export const ChatMain: FC<ChatMainProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <>
      <ResizableHandle />
      <ResizablePanel className={cn("", className)} {...rest}>
        {children}
      </ResizablePanel>
      <ResizableHandle />
    </>
  );
};
