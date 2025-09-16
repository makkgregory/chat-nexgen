import { cn } from "@/lib/cn";
import { Fragment, type FC, type HTMLAttributes, type ReactNode } from "react";
import { useChat } from "../../context/chat-context";
import type { Message } from "../../models/message";

interface ChatHistoryProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: (
    message: Message,
    props: HTMLAttributes<HTMLDivElement>
  ) => ReactNode;
}

export const ChatHistory: FC<ChatHistoryProps> = ({
  className,
  children,
  ...rest
}) => {
  const { history } = useChat();

  return (
    <div className={cn("flex flex-col gap-12", className)} {...rest}>
      {history.map((message) => (
        <Fragment key={message.id}>{children(message, {})}</Fragment>
      ))}
    </div>
  );
};
