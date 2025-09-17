import { cn } from "@chat-ai/ui";
import { type FC, type HTMLAttributes } from "react";
import { ChatPromptProvider } from "./providers/chat-prompt-provider";
import { ChatProvider } from "./providers/chat-provider";

interface ChatRootProps extends HTMLAttributes<HTMLDivElement> {}

export const ChatRoot: FC<ChatRootProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <ChatProvider>
      <ChatPromptProvider>
        <div className={cn("size-full", className)} {...rest}>
          {children}
        </div>
      </ChatPromptProvider>
    </ChatProvider>
  );
};
