import { cn } from "@/lib/cn";
import type { FC, HTMLAttributes } from "react";
import { useChatStore } from "./store/chat-store";

interface ChatContentProps extends HTMLAttributes<HTMLDivElement> {}

export const ChatContent: FC<ChatContentProps> = ({
  className,
  children,
  ...rest
}) => {
  const messages = useChatStore((state) => state.messages);

  if (!messages.length) {
    return null;
  }

  return (
    <div
      className={cn("flex flex-col max-w-3xl mx-auto h-full py-12", className)}
      {...rest}
    >
      {children}
    </div>
  );
};
