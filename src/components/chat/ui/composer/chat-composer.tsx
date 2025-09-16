import { messageTextPart } from "@/components/chat/models/message";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/cn";
import { debounce } from "lodash-es";
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type ComponentProps,
  type FC,
  type HTMLAttributes,
} from "react";
import { useChatPrompt } from "../../context/chat-prompt-context";
import { getMessagePartsText } from "../../lib/get-message-parts-text";
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

interface ChatComposerFrameProps extends HTMLAttributes<HTMLDivElement> {}

const ChatComposerFrame: FC<ChatComposerFrameProps> = ({
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
  minRows = 3,
  maxRows = 10,
  onChange,
  ...rest
}) => {
  const { prompt, updatePrompt } = useChatPrompt();
  const [value, setValue] = useState("");

  const debounceUpdatePrompt = useMemo(
    () => debounce(updatePrompt, 300),
    [updatePrompt]
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValue(value);
    onChange?.(e);
    debounceUpdatePrompt((prompt) => {
      const text = messageTextPart(value);
      return mergeMessageParts([...prompt, text]);
    });
  };

  useEffect(() => {
    setValue(getMessagePartsText(prompt));
  }, [prompt]);

  return (
    <Textarea
      placeholder="Ask anything"
      autoFocus={autoFocus}
      minRows={minRows}
      maxRows={maxRows}
      className={cn(
        "focus-visible:ring-0 border-none resize-none rounded-none shadow-none bg-transparent dark:bg-transparent p-4",
        className
      )}
      value={value}
      onChange={handleChange}
      {...rest}
    />
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
  ChatComposerDescription,
  ChatComposerFrame,
  ChatComposerInput,
};
