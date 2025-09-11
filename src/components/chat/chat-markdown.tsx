import { cn } from "@/lib/cn";
import plugins from "@/plugins";
import type { FC, HTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";

interface ChatMarkdownProps extends HTMLAttributes<HTMLDivElement> {
  children: string;
}

export const ChatMarkdown: FC<ChatMarkdownProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={cn("prose", className)} {...rest}>
      <ReactMarkdown
        children={children}
        components={plugins.content}
        remarkPlugins={plugins.remarkPlugins}
        rehypePlugins={plugins.rehypePlugins}
      />
    </div>
  );
};
