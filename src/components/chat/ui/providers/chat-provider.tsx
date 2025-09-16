import { type FC, type PropsWithChildren } from "react";
import { ChatContext } from "../../context/chat-context";
import { useChatReducer } from "../../hooks/use-chat-reducer";
import {
  userMessage,
  type Message,
  type MessagePart,
} from "../../models/message";

interface ChatProviderProps extends PropsWithChildren {}

export const ChatProvider: FC<ChatProviderProps> = ({ children }) => {
  const [state, dispatch] = useChatReducer();

  const send = (parts: MessagePart[]) => {
    dispatch({ type: "setStreaming", streaming: true });
    dispatch({ type: "pushMessage", message: userMessage({ parts }) });
  };

  const edit = (message: Message, parts: MessagePart[]) => {
    dispatch({ type: "updateMessage", message: { ...message, parts } });
  };

  const deleteMessage = (message: Message) => {
    dispatch({ type: "deleteMessage", message });
  };

  const retry = (message: Message) => {
    dispatch({ type: "setStreaming", streaming: true });
  };

  const stop = () => {
    dispatch({ type: "setStreaming", streaming: false });
  };

  return (
    <ChatContext
      value={{
        ...state,
        send,
        edit,
        delete: deleteMessage,
        retry,
        stop,
      }}
    >
      {children}
    </ChatContext>
  );
};
