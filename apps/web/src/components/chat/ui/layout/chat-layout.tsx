import {
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/cn";
import type { ComponentProps, FC } from "react";
import { useChat } from "../../context/chat-context";

interface ChatLayoutProps extends ComponentProps<typeof ResizablePanelGroup> {}

const ChatLayout: FC<ChatLayoutProps> = ({ className, children, ...rest }) => {
  const { history } = useChat();

  if (!history.length) {
    return null;
  }

  return (
    <ResizablePanelGroup className={cn("", className)} {...rest}>
      {children}
    </ResizablePanelGroup>
  );
};

interface ChatLayoutHandleProps
  extends ComponentProps<typeof ResizableHandle> {}

const ChatLayoutHandle: FC<ChatLayoutHandleProps> = ({
  className,
  ...rest
}) => {
  return <ResizableHandle className={cn("", className)} {...rest} />;
};

export { ChatLayout, ChatLayoutHandle };
