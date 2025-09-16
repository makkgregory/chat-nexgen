import { messageTextPart } from "@/components/chat/models/message";
import { cn } from "@/lib/cn";
import { Textarea } from "@chat-ai/ui";
import { debounce } from "lodash-es";
import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentProps,
  type FC,
  type FormEvent,
  type HTMLAttributes,
  type KeyboardEvent,
} from "react";
import { useChat } from "../../context/chat-context";
import { useChatPrompt } from "../../context/chat-prompt-context";
import { mergeMessageParts } from "../../lib/merge-message-parts";

interface ChatComposerProps extends HTMLAttributes<HTMLDivElement> {}

const ChatComposer: FC<ChatComposerProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...rest}>
      {children}
    </div>
  );
};

interface ChatComposerContentProps extends HTMLAttributes<HTMLDivElement> {}

const ChatComposerContent: FC<ChatComposerContentProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "border-input rounded-xl bg-input/30 overflow-clip",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

interface ChatComposerInputProps extends ComponentProps<typeof Textarea> {}

const ChatComposerInput: FC<ChatComposerInputProps> = ({
  className,
  autoFocus = true,
  minRows = 2,
  maxRows = 10,
  onChange,
  ...rest
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { prompt, isPromptEmpty, updatePrompt, clearPrompt } = useChatPrompt();
  const { sendMessage: send } = useChat();
  const [value, setValue] = useState("");

  const debounceUpdatePrompt = useMemo(
    () => debounce(updatePrompt, 300),
    [updatePrompt]
  );

  const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    switch (e.key) {
      case "Enter": {
        if (e.shiftKey) {
          return;
        }
        e.preventDefault();
        debounceUpdatePrompt.flush();
        await new Promise((resolve) => setTimeout(resolve));
        formRef.current?.requestSubmit();
        return;
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValue(value);
    onChange?.(e);
    debounceUpdatePrompt((prompt) => {
      const text = messageTextPart(value);
      return mergeMessageParts([...prompt, text]);
    });
  };

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!isPromptEmpty) {
      send(prompt);
      clearPrompt();
    }
  };

  return (
    <form className="contents" ref={formRef} onSubmit={handleSend}>
      <Textarea
        placeholder="Ask anything"
        autoFocus={autoFocus}
        minRows={minRows}
        maxRows={maxRows}
        className={cn(
          "focus-visible:ring-0 border-none resize-none rounded-none shadow-none bg-transparent dark:bg-transparent p-4",
          className
        )}
        onKeyDown={handleKeyDown}
        value={value}
        onChange={handleChange}
        {...rest}
      />
    </form>
  );
};

interface ChatComposerFooterProps extends HTMLAttributes<HTMLDivElement> {}

const ChatComposerFooter: FC<ChatComposerFooterProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={cn("flex items-center px-2 pb-2", className)} {...rest}>
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
      className={cn("text-center text-xs text-muted-foreground", className)}
      {...rest}
    >
      {children}
    </p>
  );
};

export {
  ChatComposer,
  ChatComposerContent,
  ChatComposerDescription,
  ChatComposerFooter,
  ChatComposerInput,
};
