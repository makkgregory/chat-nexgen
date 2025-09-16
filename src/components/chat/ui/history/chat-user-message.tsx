import type { Message } from "@/components/chat/models/message";
import { cn } from "@/lib/cn";
import type { FC, HTMLAttributes } from "react";
import { ChatMessagePart } from "../message-parts/chat-message-part";

interface ChatUserMessageProps extends HTMLAttributes<HTMLDivElement> {
  message: Message;
}

export const ChatUserMessage: FC<ChatUserMessageProps> = ({
  className,
  message,
  ...rest
}) => {
  return (
    <div
      className={cn("w-2/3 self-end rounded-xl p-4 bg-muted", className)}
      {...rest}
    >
      {message.parts.map((part, index) => (
        <ChatMessagePart key={index} part={part} />
      ))}
    </div>
  );
};
