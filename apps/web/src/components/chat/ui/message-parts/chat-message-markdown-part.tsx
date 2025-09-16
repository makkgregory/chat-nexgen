import { cn } from "@/lib/cn";
import plugins from "@/plugins";
import type { FC, HTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";

interface ChatMessageMarkdownPartProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
}

export const ChatMessageMarkdownPart: FC<ChatMessageMarkdownPartProps> = ({
  className,
  content,
  ...rest
}) => {
  return (
    <div className={cn("prose-sm", className)} {...rest}>
      <ReactMarkdown
        children={content}
        components={plugins.content}
        remarkPlugins={plugins.remarkPlugins}
        rehypePlugins={plugins.rehypePlugins}
      />
    </div>
  );
};
