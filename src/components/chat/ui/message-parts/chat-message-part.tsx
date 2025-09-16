import type { MessagePart } from "@/components/chat/models/message";
import type { FC, HTMLAttributes } from "react";
import { ChatMessageTextPart } from "./chat-message-text-part";

interface ChatMessagePartProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "part"> {
  part: MessagePart;
}

export const ChatMessagePart: FC<ChatMessagePartProps> = ({
  part,
  ...rest
}) => {
  switch (part.type) {
    case "text":
      return <ChatMessageTextPart content={part.text} {...rest} />;
    case "markdown":
      return <ChatMessageTextPart content={part.markdown} {...rest} />;
  }
};
