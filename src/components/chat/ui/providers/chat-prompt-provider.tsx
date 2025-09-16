import { useState, type FC, type PropsWithChildren } from "react";
import { ChatPromptContext } from "../../context/chat-prompt-context";
import { type MessagePart } from "../../models/message";

interface ChatPromptProviderProps extends PropsWithChildren {}

export const ChatPromptProvider: FC<ChatPromptProviderProps> = ({
  children,
}) => {
  const [prompt, setPrompt] = useState<MessagePart[]>([]);

  const updatePrompt = (
    callback: (content: MessagePart[]) => MessagePart[]
  ) => {
    setPrompt((prev) => callback(prev));
  };

  const clearPrompt = () => {
    setPrompt([]);
  };

  return (
    <ChatPromptContext
      value={{
        prompt,
        updatePrompt,
        clearPrompt,
      }}
    >
      {children}
    </ChatPromptContext>
  );
};
