import { create } from "zustand";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatState {
  messages: Message[];
  pushMessage: (message: Message) => void;
}

export const useChatStore = create<ChatState>()((set) => ({
  messages: [],
  pushMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
}));
