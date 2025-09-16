import type { MessagePart } from "@/components/chat/models/message";
import { createContext, use } from "react";

export interface ChatPromptContext {
  prompt: MessagePart[];
  isPromptEmpty: boolean;
  updatePrompt: (callback: (content: MessagePart[]) => MessagePart[]) => void;
  clearPrompt: () => void;
}

export const ChatPromptContext = createContext<ChatPromptContext | null>(null);

export const useChatPrompt = () => {
  const context = use(ChatPromptContext);
  if (!context) {
    throw new Error("useChatPrompt must be used within a ChatPromptContext");
  }
  return context;
};
