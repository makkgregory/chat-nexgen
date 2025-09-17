import type { AssistantMessage } from "../../models/message";
import { cn } from "@chat-ai/ui";
import type { FC, HTMLAttributes } from "react";
import { useChatAssistantMessage } from "../../context/chat-assistant-message-context";
import { ChatMessagePart } from "../message-parts/chat-message-part";
import { ChatAssistantMessageProvider } from "../providers/chat-assistant-message-provider";

interface ChatAssistantMessageProps extends HTMLAttributes<HTMLDivElement> {
  message: AssistantMessage;
}

const ChatAssistantMessage: FC<ChatAssistantMessageProps> = ({
  className,
  message,
  children,
  ...rest
}) => {
  return (
    <ChatAssistantMessageProvider message={message}>
      <div className={cn("", className)} {...rest}>
        {children}
      </div>
    </ChatAssistantMessageProvider>
  );
};

interface ChatAssistantMessageContentProps
  extends HTMLAttributes<HTMLDivElement> {}

const ChatAssistantMessageContent: FC<ChatAssistantMessageContentProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={cn("", className)} {...rest}>
      {children}
    </div>
  );
};

interface ChatAssistantMessageThinkingProps
  extends HTMLAttributes<HTMLDivElement> {}

const ChatAssistantMessageThinking: FC<ChatAssistantMessageThinkingProps> = ({
  className,
  ...rest
}) => {
  const { message } = useChatAssistantMessage();

  if (!message.streaming || message.parts.length) {
    return null;
  }

  return (
    <div className={cn("prose-sm", className)} {...rest}>
      <p>Thinking...</p>
    </div>
  );
};

interface ChatAssistantMessagePartsProps
  extends HTMLAttributes<HTMLDivElement> {}

const ChatAssistantMessageParts: FC<ChatAssistantMessagePartsProps> = ({
  className,
  ...rest
}) => {
  const { message } = useChatAssistantMessage();

  return (
    <div className={cn("", className)} {...rest}>
      {message.parts.map((part, index) => (
        <ChatMessagePart key={index} part={part} />
      ))}
    </div>
  );
};

interface ChatAssistantMessageNoContentProps
  extends HTMLAttributes<HTMLDivElement> {}

const ChatAssistantMessageNoContent: FC<ChatAssistantMessageNoContentProps> = ({
  className,
  ...rest
}) => {
  const { message } = useChatAssistantMessage();

  if (message.streaming || message.parts.length) {
    return null;
  }

  return (
    <div className={cn("prose-sm", className)} {...rest}>
      <p>No content available</p>
    </div>
  );
};

interface ChatAssistantMessageFooterProps
  extends HTMLAttributes<HTMLDivElement> {}

const ChatAssistantMessageFooter: FC<ChatAssistantMessageFooterProps> = ({
  className,
  children,
  ...rest
}) => {
  const { message } = useChatAssistantMessage();

  if (message.streaming) {
    return null;
  }

  return (
    <div className={cn("flex items-center", className)} {...rest}>
      {children}
    </div>
  );
};

export {
  ChatAssistantMessage,
  ChatAssistantMessageContent,
  ChatAssistantMessageFooter,
  ChatAssistantMessageNoContent,
  ChatAssistantMessageParts,
  ChatAssistantMessageThinking,
};
