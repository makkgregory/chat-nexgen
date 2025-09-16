import type { Message } from "@/components/chat/models/message";
import { createContext, use } from "react";

export const ChatMessageContext = createContext<Message | null>(null);

export const useChatMessage = () => {
  const context = use(ChatMessageContext);
  if (!context) {
    throw new Error("useChatMessage must be used within a ChatMessageContext");
  }
  return context;
};
