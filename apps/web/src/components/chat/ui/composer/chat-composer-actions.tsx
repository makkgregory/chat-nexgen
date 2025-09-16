import { cn } from "@/lib/cn";
import { Button } from "@chat-ai/ui";
import { IconArrowUp, IconSquareFilled } from "@tabler/icons-react";
import type { ComponentProps, FC } from "react";
import { useChat } from "../../context/chat-context";
import { useChatPrompt } from "../../context/chat-prompt-context";

interface ChatComposerSendProps extends ComponentProps<typeof Button> {}

const ChatComposerSend: FC<ChatComposerSendProps> = ({
  className,
  ...rest
}) => {
  const { history, sendMessage } = useChat();
  const { prompt, isPromptEmpty, clearPrompt } = useChatPrompt();
  const top = history.at(-1);

  const handleSend = () => {
    sendMessage(prompt);
    clearPrompt();
  };

  if (top?.role === "assistant" && top.streaming) {
    return null;
  }

  return (
    <Button
      disabled={isPromptEmpty}
      size="icon"
      onClick={handleSend}
      className={cn("", className)}
      {...rest}
    >
      <IconArrowUp stroke={3} className="size-5" />
    </Button>
  );
};

interface ChatComposerStopProps extends ComponentProps<typeof Button> {}

const ChatComposerStop: FC<ChatComposerStopProps> = ({
  className,
  ...rest
}) => {
  const { history, stopGenerating } = useChat();
  const top = history.at(-1);

  if (top?.role !== "assistant" || !top.streaming) {
    return null;
  }

  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={stopGenerating}
      className={cn("", className)}
      {...rest}
    >
      <IconSquareFilled />
    </Button>
  );
};

export { ChatComposerSend, ChatComposerStop };
