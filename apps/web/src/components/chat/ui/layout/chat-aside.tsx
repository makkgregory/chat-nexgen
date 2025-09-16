import { ResizablePanel } from "@/components/ui/resizable";
import { cn } from "@/lib/cn";
import type { ComponentProps, FC } from "react";

interface ChatAsideProps extends ComponentProps<typeof ResizablePanel> {}

export const ChatAside: FC<ChatAsideProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <ResizablePanel className={cn("", className)} {...rest}>
      {children}
    </ResizablePanel>
  );
};
