import { cn } from "@/lib/cn";
import type { FC, HTMLAttributes } from "react";
import type { Message } from "./store/chat-store";

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
      {message.content}
    </div>
  );
};
