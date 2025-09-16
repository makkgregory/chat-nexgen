import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { IconSquareFilled } from "@tabler/icons-react";
import type { ComponentProps, FC } from "react";
import { useChat } from "../../context/chat-context";

interface ChatStopProps extends ComponentProps<typeof Button> {}

export const ChatStop: FC<ChatStopProps> = ({ className, ...rest }) => {
  const { history, stop } = useChat();
  const top = history.at(-1);

  if (top?.role !== "assistant" || !top.streaming) {
    return null;
  }

  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={stop}
      className={cn("", className)}
      {...rest}
    >
      <IconSquareFilled />
    </Button>
  );
};
