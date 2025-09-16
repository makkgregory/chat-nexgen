import { cn } from "@/lib/cn";
import { type FC, type HTMLAttributes } from "react";
import { ChatContext } from "../context/chat-context";

interface ChatRootProps extends HTMLAttributes<HTMLDivElement> {}

export const ChatRoot: FC<ChatRootProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <ChatContext value={{ loading: true, history: [] }}>
      <div className={cn("size-full", className)} {...rest}>
        {children}
      </div>
    </ChatContext>
  );
};
