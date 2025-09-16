import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { IconSend } from "@tabler/icons-react";
import type { ComponentProps, FC } from "react";
import { useChat } from "../../context/chat-context";
import { useChatPrompt } from "../../context/chat-prompt-context";

interface ChatSendProps extends ComponentProps<typeof Button> {}

export const ChatSend: FC<ChatSendProps> = ({ className, ...rest }) => {
  const { history, send } = useChat();
  const { prompt, clearPrompt } = useChatPrompt();
  const top = history.at(-1);

  const handleSend = () => {
    send(prompt);
    clearPrompt();
  };

  if (top?.role === "assistant" && top.streaming) {
    return null;
  }

  return (
    <Button
      size="icon"
      onClick={handleSend}
      className={cn("", className)}
      {...rest}
    >
      <IconSend />
    </Button>
  );
};
