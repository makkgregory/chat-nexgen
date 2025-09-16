import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { IconSend } from "@tabler/icons-react";
import type { ComponentProps, FC } from "react";
import { useChat } from "../../context/chat-context";

interface ChatSendProps extends ComponentProps<typeof Button> {}

export const ChatSend: FC<ChatSendProps> = ({ className, ...rest }) => {
  const { streaming, prompt, send, clearPrompt } = useChat();

  const handleSend = () => {
    send(prompt);
    clearPrompt();
  };

  if (streaming) {
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
