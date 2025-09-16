import { cn } from "@/lib/cn";
import type { FC, HTMLAttributes } from "react";
import { useChat } from "../../context/chat-context";
import { ChatAssistantMessage } from "../chat-assistant-message";
import { ChatUserMessage } from "./chat-user-message";

interface ChatHistoryProps extends HTMLAttributes<HTMLDivElement> {}

export const ChatHistory: FC<ChatHistoryProps> = ({ className, ...rest }) => {
  const { messages } = useChat();

  return (
    <div
      className={cn(
        "flex flex-col gap-12 flex-1 min-h-0 pb-12 overflow-auto scrollbar",
        className
      )}
      {...rest}
    >
      {messages.map((message, index) =>
        message.role === "user" ? (
          <ChatUserMessage key={index} message={message} />
        ) : (
          <ChatAssistantMessage key={index} message={message} />
        )
      )}
    </div>
  );
};
