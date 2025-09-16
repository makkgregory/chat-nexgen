import { useRef, type FC, type PropsWithChildren } from "react";
import { ChatContext } from "../../context/chat-context";
import { useChatReducer } from "../../hooks/use-chat-reducer";
import { streamText } from "../../lib/stream-text";
import {
  assistantMessage,
  userMessage,
  type Message,
  type MessagePart,
} from "../../models/message";

interface ChatProviderProps extends PropsWithChildren {}

export const ChatProvider: FC<ChatProviderProps> = ({ children }) => {
  const [state, dispatch] = useChatReducer();
  const controllerRef = useRef(new AbortController());

  const send = async (parts: MessagePart[]) => {
    const controller = new AbortController();
    const prompt = userMessage({ parts });
    const response = assistantMessage({ streaming: true, parts: [] });
    const history = [...state.history, prompt];
    const stream = streamText({
      history,
      signal: controller.signal,
    });

    controllerRef.current = controller;
    dispatch({ type: "pushMessages", message: [prompt, response] });

    for await (const part of stream) {
      dispatch({
        type: "pushMessageParts",
        message: response,
        parts: [part],
      });
    }

    dispatch({ type: "finishMessage", message: response });
  };

  const edit = (message: Message, parts: MessagePart[]) => {
    dispatch({ type: "updateMessageParts", message, parts });
  };

  const deleteMessage = (message: Message) => {
    dispatch({ type: "deleteMessage", message });
  };

  const retry = (message: Message) => {
    throw new Error("Not implemented");
  };

  const stop = () => {
    controllerRef.current.abort();
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
