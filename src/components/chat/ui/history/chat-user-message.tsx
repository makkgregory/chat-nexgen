import type { UserMessage } from "@/components/chat/models/message";
import { cn } from "@/lib/cn";
import type { FC, HTMLAttributes } from "react";
import { ChatMessageContext } from "../../context/chat-message-context";
import { ChatMessagePart } from "../message-parts/chat-message-part";

interface ChatUserMessageProps extends HTMLAttributes<HTMLDivElement> {
  message: UserMessage;
}

export const ChatUserMessage: FC<ChatUserMessageProps> = ({
  className,
  message,
  children,
  ...rest
}) => {
  return (
    <ChatMessageContext value={message}>
      <div
        className={cn(
          "max-w-2/3 min-w-xs self-end rounded-xl px-4 py-2 bg-accent",
          className
        )}
        {...rest}
      >
        {message.parts.map((part, index) => (
          <ChatMessagePart key={index} part={part} />
        ))}

        {children}
      </div>
    </ChatMessageContext>
  );
};
