import { useMemo, useState, type FC, type PropsWithChildren } from "react";
import { ChatPromptContext } from "../../context/chat-prompt-context";
import { getMessagePartsText } from "../../lib/get-message-parts-text";
import { type MessagePart } from "../../models/message";

interface ChatPromptProviderProps extends PropsWithChildren {}

export const ChatPromptProvider: FC<ChatPromptProviderProps> = ({
  children,
}) => {
  const [prompt, setPrompt] = useState<MessagePart[]>([]);

  const isPromptEmpty = useMemo(() => {
    return !getMessagePartsText(prompt).trim();
  }, [prompt]);

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
        isPromptEmpty,
        updatePrompt,
        clearPrompt,
      }}
    >
      {children}
    </ChatPromptContext>
  );
};
