import { cn } from "@/lib/cn";
import type { FC, HTMLAttributes } from "react";
import { useChat } from "../../context/chat-context";

interface ChatThinkingProps extends HTMLAttributes<HTMLDivElement> {}

export const ChatThinking: FC<ChatThinkingProps> = ({ className, ...rest }) => {
  const { streaming, history } = useChat();
  const topMessage = history.at(-1);

  if (!streaming || topMessage?.role === "assistant") {
    return null;
  }

  return (
    <div className={cn("", className)} {...rest}>
      Thinking...
    </div>
  );
};
