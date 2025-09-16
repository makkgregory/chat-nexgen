import type { AssistantMessage } from "@/components/chat/models/message";
import { cn } from "@/lib/cn";
import type { FC, HTMLAttributes } from "react";
import { ChatMessageContext } from "../../context/chat-message-context";
import { ChatMessagePart } from "../message-parts/chat-message-part";

interface ChatAssistantMessageProps extends HTMLAttributes<HTMLDivElement> {
  message: AssistantMessage;
}

export const ChatAssistantMessage: FC<ChatAssistantMessageProps> = ({
  className,
  message,
  children,
  ...rest
}) => {
  return (
    <ChatMessageContext value={message}>
      <div className={cn("", className)} {...rest}>
        {message.parts.map((part, index) => (
          <ChatMessagePart key={index} part={part} />
        ))}
        {children}
      </div>
    </ChatMessageContext>
  );
};
