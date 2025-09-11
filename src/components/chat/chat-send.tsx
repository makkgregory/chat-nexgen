import { cn } from "@/lib/cn";
import { IconSend } from "@tabler/icons-react";
import type { FC, HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { ChatComposerPrimaryItem } from "./chat-composer";
import { useChatStore } from "./store/chat-store";
import { messageData } from "./store/message-data";

interface ChatSendProps extends HTMLAttributes<HTMLDivElement> {}

export const ChatSend: FC<ChatSendProps> = ({ className, ...rest }) => {
  const pushMessage = useChatStore((state) => state.pushMessage);

  const handleSend = () => {
    pushMessage({
      role: "user",
      content: "What is the capital of France?",
    });

    pushMessage({
      role: "assistant",
      content: messageData,
    });
  };

  return (
    <ChatComposerPrimaryItem className={cn("", className)} {...rest}>
      <Button size="icon" onClick={handleSend}>
        <IconSend />
      </Button>
    </ChatComposerPrimaryItem>
  );
};
