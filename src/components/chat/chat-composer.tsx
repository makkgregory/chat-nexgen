import { cn } from "@/lib/cn";
import plugins from "@/plugins";
import type { FC, HTMLAttributes } from "react";
import { Textarea } from "../ui/textarea";

interface ChatComposerProps extends HTMLAttributes<HTMLDivElement> {}

export const ChatComposer: FC<ChatComposerProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={cn("relative w-full", className)} {...rest}>
      <Textarea
        placeholder="Ask anything"
        autoFocus
        minRows={2}
        className="focus-visible:ring-0 focus-visible:border-input resize-none pb-12 px-4 pt-4 rounded-xl shadow-md"
      />
      {children}
      {plugins.composer.map((Cmp, index) => (
        <Cmp key={index} />
      ))}
    </div>
  );
};
