import { type FC, type PropsWithChildren } from "react";
import { ChatAssistantMessageContext } from "../../context/chat-assistant-message-context";
import { useChat } from "../../context/chat-context";
import type { AssistantMessage } from "../../models/message";

interface ChatAssistantMessageProviderProps extends PropsWithChildren {
  message: AssistantMessage;
}

export const ChatAssistantMessageProvider: FC<
  ChatAssistantMessageProviderProps
> = ({ message, children }) => {
  const chat = useChat();

  const retryMessage = () => chat.retryMessage(message);
  const deleteMessage = () => {
    const index = chat.history.findIndex((m) => m.id === message.id);
    const before = chat.history.at(index - 1);
    if (before?.role === "user") {
      chat.deleteMessage(before);
    }
  };

  return (
    <ChatAssistantMessageContext
      value={{ message, retryMessage, deleteMessage }}
    >
      {children}
    </ChatAssistantMessageContext>
  );
};
