import { cn } from "@/lib/cn";
import type { FC, HTMLAttributes } from "react";
import { ChatMarkdown } from "./chat-markdown";
import type { Message } from "./store/chat-store";

interface ChatAssistantMessageProps extends HTMLAttributes<HTMLDivElement> {
  message: Message;
}

export const ChatAssistantMessage: FC<ChatAssistantMessageProps> = ({
  className,
  message,
  ...rest
}) => {
  return (
    <div className={cn("", className)} {...rest}>
      <ChatMarkdown>{message.content}</ChatMarkdown>
    </div>
  );
};
