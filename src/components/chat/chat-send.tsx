import { cn } from "@/lib/cn";
import { IconSend } from "@tabler/icons-react";
import type { FC, HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { ChatComposerPrimaryItem } from "./chat-composer";

interface ChatSendProps extends HTMLAttributes<HTMLDivElement> {}

export const ChatSend: FC<ChatSendProps> = ({ className, ...rest }) => {
  return (
    <ChatComposerPrimaryItem className={cn("", className)} {...rest}>
      <Button size="icon">
        <IconSend />
      </Button>
    </ChatComposerPrimaryItem>
  );
};
