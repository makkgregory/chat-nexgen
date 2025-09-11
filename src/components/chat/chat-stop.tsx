import { cn } from "@/lib/cn";
import { IconSquareFilled } from "@tabler/icons-react";
import type { FC, HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { ChatComposerPrimaryItem } from "./chat-composer";

interface ChatStopProps extends HTMLAttributes<HTMLDivElement> {}

export const ChatStop: FC<ChatStopProps> = ({ className, ...rest }) => {
  return null;

  return (
    <ChatComposerPrimaryItem className={cn("", className)} {...rest}>
      <Button variant="secondary" size="icon">
        <IconSquareFilled />
      </Button>
    </ChatComposerPrimaryItem>
  );
};
