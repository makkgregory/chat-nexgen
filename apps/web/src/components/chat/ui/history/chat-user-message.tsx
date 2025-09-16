import type { UserMessage } from "@/components/chat/models/message";
import { cn } from "@chat-ai/ui";
import type { FC, HTMLAttributes } from "react";
import { useChatUserMessage } from "../../context/chat-user-message-context";
import { ChatMessagePart } from "../message-parts/chat-message-part";
import { ChatUserMessageProvider } from "../providers/chat-user-message-provider";

interface ChatUserMessageProps extends HTMLAttributes<HTMLDivElement> {
  message: UserMessage;
}

const ChatUserMessage: FC<ChatUserMessageProps> = ({
  className,
  message,
  children,
  ...rest
}) => {
  return (
    <ChatUserMessageProvider message={message}>
      <div
        className={cn(
          "group/chat-user-message flex flex-col items-end",
          className
        )}
        {...rest}
      >
        {children}
      </div>
    </ChatUserMessageProvider>
  );
};

interface ChatUserMessageContentProps extends HTMLAttributes<HTMLDivElement> {}

const ChatUserMessageContent: FC<ChatUserMessageContentProps> = ({
  className,
  children,
  ...rest
}) => {
  const { editMode } = useChatUserMessage();

  if (editMode) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-2", className)} {...rest}>
      {children}
    </div>
  );
};

interface ChatUserMessagePartsProps extends HTMLAttributes<HTMLDivElement> {}

const ChatUserMessageParts: FC<ChatUserMessagePartsProps> = ({
  className,
  ...rest
}) => {
  const { message } = useChatUserMessage();

  return (
    <div
      className={cn(
        "w-full min-w-sm max-w-xl rounded-xl px-4 py-2 bg-accent",
        className
      )}
      {...rest}
    >
      {message.parts.map((part, index) => (
        <ChatMessagePart key={index} part={part} />
      ))}
    </div>
  );
};

interface ChatUserMessageFooterProps extends HTMLAttributes<HTMLDivElement> {}

const ChatUserMessageFooter: FC<ChatUserMessageFooterProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "flex justify-end items-center invisible group-hover/chat-user-message:visible",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export {
  ChatUserMessage,
  ChatUserMessageContent,
  ChatUserMessageFooter,
  ChatUserMessageParts,
};
