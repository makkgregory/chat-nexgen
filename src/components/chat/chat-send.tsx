import { cn } from "@/lib/cn";
import { IconSend } from "@tabler/icons-react";
import type { ComponentProps, FC } from "react";
import { Button } from "../ui/button";

interface ChatSendProps extends ComponentProps<typeof Button> {}

export const ChatSend: FC<ChatSendProps> = ({ className, ...rest }) => {
  return (
    <Button
      className={cn("absolute right-2 bottom-2", className)}
      size="icon"
      {...rest}
    >
      <IconSend />
    </Button>
  );
};
