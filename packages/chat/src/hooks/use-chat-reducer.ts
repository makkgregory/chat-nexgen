import { useReducer } from "react";
import { mergeMessageParts } from "../lib/merge-message-parts";
import { MessagePart, type Message } from "../models/message";

export interface ChatState {
  loading: boolean;
  history: Message[];
}

const initialState: ChatState = {
  loading: false,
  history: [],
};

export type ChatAction =
  | { type: "setLoading"; loading: boolean }
  | { type: "pushMessages"; message: Message[] }
  | { type: "pushMessageParts"; message: Message; parts: MessagePart[] }
  | { type: "updateMessageParts"; message: Message; parts: MessagePart[] }
  | { type: "finishMessage"; message: Message }
  | { type: "deleteMessage"; message: Message };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case "setLoading":
      return { ...state, loading: action.loading };
    case "pushMessages":
      return { ...state, history: [...state.history, ...action.message] };
    case "updateMessageParts":
      return {
        ...state,
        history: state.history.map((m) =>
          m.id === action.message.id ? { ...m, parts: action.parts } : m
        ),
      };
    case "pushMessageParts":
      return {
        ...state,
        history: state.history.map((m) => {
          if (m.id === action.message.id) {
            return {
              ...m,
              parts: mergeMessageParts([...m.parts, ...action.parts]),
            };
          }
          return m;
        }),
      };
    case "finishMessage":
      return {
        ...state,
        history: state.history.map((m) => {
          if (m.id === action.message.id) {
            return { ...m, streaming: false };
          }
          return m;
        }),
      };
    case "deleteMessage": {
      const index = state.history.findIndex((x) => x.id === action.message.id);
      if (index < 0) {
        return state;
      }
      return {
        ...state,
        history: state.history.slice(0, index),
      };
    }
  }
};

export const useChatReducer = () => {
  return useReducer(chatReducer, initialState);
};
