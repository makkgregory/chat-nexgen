import { useState, type FC, type PropsWithChildren } from "react";
import { useChat } from "../../context/chat-context";
import { ChatUserMessageContext } from "../../context/chat-user-message-context";
import type { MessagePart, UserMessage } from "../../models/message";

interface ChatUserMessageProviderProps extends PropsWithChildren {
  message: UserMessage;
}

export const ChatUserMessageProvider: FC<ChatUserMessageProviderProps> = ({
  message,
  children,
}) => {
  const chat = useChat();
  const [editMode, setEditMode] = useState(false);

  const enterEditMode = () => setEditMode(true);
  const exitEditMode = () => setEditMode(false);

  const flushChanges = (changes: MessagePart[]) => {
    chat.editMessage(message, changes);
    exitEditMode();
  };

  return (
    <ChatUserMessageContext
      value={{ message, editMode, enterEditMode, exitEditMode, flushChanges }}
    >
      {children}
    </ChatUserMessageContext>
  );
};
