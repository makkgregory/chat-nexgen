import type { Message, MessagePart } from "../models/message";
import { createContext, use } from "react";

export interface ChatContext {
  loading: boolean;
  history: Message[];
  sendMessage: (content: MessagePart[]) => void;
  editMessage: (message: Message, content: MessagePart[]) => void;
  deleteMessage: (message: Message) => void;
  retryMessage: (message: Message) => void;
  stopGenerating: () => void;
}

export const ChatContext = createContext<ChatContext | null>(null);

export const useChat = () => {
  const context = use(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatContext");
  }
  return context;
};
