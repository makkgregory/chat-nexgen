import { cn } from "@chat-ai/ui";
import type { FC, HTMLAttributes } from "react";

interface ChatMessageTextPartProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
}

export const ChatMessageTextPart: FC<ChatMessageTextPartProps> = ({
  className,
  content,
  ...rest
}) => {
  return (
    <div className={cn("prose-sm", className)} {...rest}>
      <p>{content}</p>
    </div>
  );
};
