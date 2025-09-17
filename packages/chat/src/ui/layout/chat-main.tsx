import { cn, ResizablePanel, ScrollArea } from "@chat-ai/ui";
import {
  useRef,
  type ComponentProps,
  type FC,
  type HTMLAttributes,
} from "react";

interface ChatMainProps extends ComponentProps<typeof ResizablePanel> {}

const ChatMain: FC<ChatMainProps> = ({ className, children, ...rest }) => {
  return (
    <ResizablePanel className={cn("flex flex-col", className)} {...rest}>
      {children}
    </ResizablePanel>
  );
};

interface ChatMainScrollAreaProps extends ComponentProps<typeof ScrollArea> {}

const ChatMainScrollArea: FC<ChatMainScrollAreaProps> = ({
  className,
  children,
  ...rest
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollArea
      className={cn("flex-1 min-h-0", className)}
      viewportRef={scrollRef}
      {...rest}
    >
      <div className="mx-auto w-full max-w-4xl p-6 pb-[75vh]">{children}</div>
    </ScrollArea>
  );
};

interface ChatMainComposerProps extends HTMLAttributes<HTMLDivElement> {}

const ChatMainComposer: FC<ChatMainComposerProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={cn("w-full mx-auto max-w-4xl px-6 pb-2", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export { ChatMain, ChatMainComposer, ChatMainScrollArea };
