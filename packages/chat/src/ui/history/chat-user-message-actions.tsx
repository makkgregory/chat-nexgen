import { Button, cn } from "@chat-ai/ui";
import { IconPencil } from "@tabler/icons-react";
import { type ComponentProps, type FC } from "react";
import { useChatUserMessage } from "../../context/chat-user-message-context";

interface ChatUserMessageEditProps extends ComponentProps<typeof Button> {}

const ChatUserMessageEdit: FC<ChatUserMessageEditProps> = ({
  className,
  ...rest
}) => {
  const { enterEditMode } = useChatUserMessage();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("", className)}
      onClick={enterEditMode}
      {...rest}
    >
      <IconPencil />
    </Button>
  );
};

export { ChatUserMessageEdit };
