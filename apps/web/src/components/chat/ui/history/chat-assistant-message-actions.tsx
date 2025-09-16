import { cn } from "@/lib/cn";
import { Button } from "@chat-ai/ui";
import { IconRefresh, IconTrash } from "@tabler/icons-react";
import { type ComponentProps, type FC } from "react";
import { useChatAssistantMessage } from "../../context/chat-assistant-message-context";

interface ChatAssistantMessageDeleteProps
  extends ComponentProps<typeof Button> {}

const ChatAssistantMessageDelete: FC<ChatAssistantMessageDeleteProps> = ({
  className,
  ...rest
}) => {
  const { deleteMessage } = useChatAssistantMessage();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("", className)}
      onClick={deleteMessage}
      {...rest}
    >
      <IconTrash />
    </Button>
  );
};

interface ChatAssistantMessageRetryProps
  extends ComponentProps<typeof Button> {}

const ChatAssistantMessageRetry: FC<ChatAssistantMessageRetryProps> = ({
  className,
  ...rest
}) => {
  const { retryMessage } = useChatAssistantMessage();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("", className)}
      onClick={retryMessage}
      {...rest}
    >
      <IconRefresh />
    </Button>
  );
};

export { ChatAssistantMessageDelete, ChatAssistantMessageRetry };
