import { useReducer } from "react";
import {
  assistantMessage,
  messageTextPart,
  userMessage,
  type Message,
} from "../models/message";

export interface ChatState {
  loading: boolean;
  streaming: boolean;
  history: Message[];
}

const initialState: ChatState = {
  loading: false,
  streaming: false,
  history: Array.from({ length: 20 }).flatMap(() => [
    userMessage({ parts: [messageTextPart("Hello")] }),
    assistantMessage({ parts: [messageTextPart("World")] }),
  ]),
};

export type ChatAction =
  | { type: "setLoading"; loading: boolean }
  | { type: "setStreaming"; streaming: boolean }
  | { type: "pushMessage"; message: Message }
  | { type: "updateMessage"; message: Message }
  | { type: "deleteMessage"; message: Message };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case "setLoading":
      return { ...state, loading: action.loading };
    case "setStreaming":
      return { ...state, streaming: action.streaming };
    case "pushMessage":
      return { ...state, history: [...state.history, action.message] };
    case "updateMessage":
      return {
        ...state,
        history: state.history.map((m) =>
          m.id === action.message.id ? action.message : m
        ),
      };
    case "deleteMessage":
      return {
        ...state,
        history: state.history.filter((m) => m.id !== action.message.id),
      };
    default:
      return state;
  }
};

export const useChatReducer = () => {
  return useReducer(chatReducer, initialState);
};
