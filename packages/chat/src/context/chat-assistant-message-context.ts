import type { AssistantMessage } from "../models/message";
import { createContext, use } from "react";

export interface ChatAssistantMessageContext {
  message: AssistantMessage;
  retryMessage: () => void;
  deleteMessage: () => void;
}

export const ChatAssistantMessageContext =
  createContext<ChatAssistantMessageContext | null>(null);

export const useChatAssistantMessage = () => {
  const context = use(ChatAssistantMessageContext);
  if (!context) {
    throw new Error(
      "useChatAssistantMessage must be used within a ChatAssistantMessageContext"
    );
  }
  return context;
};
