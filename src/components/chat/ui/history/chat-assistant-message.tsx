import type { Message } from "@/components/chat/models/message";
import { cn } from "@/lib/cn";
import type { FC, HTMLAttributes } from "react";
import { ChatMessagePart } from "../message-parts/chat-message-part";

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
      {message.parts.map((part, index) => (
        <ChatMessagePart key={index} part={part} />
      ))}
    </div>
  );
};
