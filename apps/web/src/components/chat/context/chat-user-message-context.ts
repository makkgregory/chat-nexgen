import type {
  MessagePart,
  UserMessage,
} from "@/components/chat/models/message";
import { createContext, use } from "react";

export interface ChatUserMessageContext {
  message: UserMessage;
  editMode: boolean;
  enterEditMode: () => void;
  exitEditMode: () => void;
  flushChanges: (changes: MessagePart[]) => void;
}

export const ChatUserMessageContext =
  createContext<ChatUserMessageContext | null>(null);

export const useChatUserMessage = () => {
  const context = use(ChatUserMessageContext);
  if (!context) {
    throw new Error(
      "useChatUserMessage must be used within a ChatUserMessageContext"
    );
  }
  return context;
};
