import type { Message, MessagePart } from "@/components/chat/models/message";
import { createContext, use } from "react";

export interface ChatContext {
  loading: boolean;
  streaming: boolean;
  history: Message[];
  prompt: MessagePart[];
  send: (content: MessagePart[]) => void;
  edit: (message: Message, content: MessagePart[]) => void;
  delete: (message: Message) => void;
  retry: (message: Message) => void;
  stop: () => void;
  updatePrompt: (callback: (content: MessagePart[]) => MessagePart[]) => void;
  clearPrompt: () => void;
}

export const ChatContext = createContext<ChatContext | null>(null);

export const useChat = () => {
  const context = use(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatContext");
  }
  return context;
};
