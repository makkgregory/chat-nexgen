import { cn } from "@/lib/cn";
import plugins from "@/plugins";
import type { FC, HTMLAttributes } from "react";
import { Textarea } from "../ui/textarea";

interface ChatComposerProps extends HTMLAttributes<HTMLDivElement> {}

const ChatComposer: FC<ChatComposerProps> = ({
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
        maxRows={10}
        className="focus-visible:ring-0 focus-visible:border-input resize-none pb-12 px-4 pt-4 rounded-xl shadow-md"
      />
      {children}
      {plugins.composer.map((Cmp, index) => (
        <Cmp key={index} />
      ))}
    </div>
  );
};

interface ChatComposerPrimaryItemProps extends HTMLAttributes<HTMLDivElement> {}

const ChatComposerPrimaryItem: FC<ChatComposerPrimaryItemProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={cn("absolute right-2 bottom-2", className)} {...rest}>
      {children}
    </div>
  );
};

interface ChatComposerSecondaryItemProps
  extends HTMLAttributes<HTMLDivElement> {}

const ChatComposerSecondaryItem: FC<ChatComposerSecondaryItemProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={cn("absolute left-2 bottom-2", className)} {...rest}>
      {children}
    </div>
  );
};

interface ChatComposerDescriptionProps extends HTMLAttributes<HTMLDivElement> {}

const ChatComposerDescription: FC<ChatComposerDescriptionProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <p
      className={cn(
        "w-full absolute -bottom-5 text-center text-xs text-muted-foreground",
        className
      )}
      {...rest}
    >
      {children}
    </p>
  );
};

export {
  ChatComposer,
  ChatComposerDescription,
  ChatComposerPrimaryItem,
  ChatComposerSecondaryItem,
};
