import { cn } from "@/lib/cn";
import type { FC, HTMLAttributes } from "react";
import { useChatMessage } from "../../context/chat-message-context";

interface ChatThinkingProps extends HTMLAttributes<HTMLDivElement> {}

export const ChatAssistantThinking: FC<ChatThinkingProps> = ({
  className,
  ...rest
}) => {
  const message = useChatMessage();

  if (message.role !== "assistant" || !message.streaming) {
    return null;
  }

  if (message.parts.length) {
    return null;
  }

  return (
    <div className={cn("", className)} {...rest}>
      Thinking...
    </div>
  );
};
