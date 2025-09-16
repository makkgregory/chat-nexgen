import { cn } from "@/lib/cn";
import { Button } from "@chat-ai/ui";
import type { ComponentProps, FC, HTMLAttributes } from "react";
import { useChatUserMessage } from "../../context/chat-user-message-context";

interface ChatUserMessageFormProps extends HTMLAttributes<HTMLDivElement> {}

const ChatUserMessageForm: FC<ChatUserMessageFormProps> = ({ children }) => {
  const { editMode } = useChatUserMessage();

  if (!editMode) {
    return null;
  }

  return <div className={cn("flex flex-col gap-1 w-full")}>{children}</div>;
};

interface ChatUserMessageFormContentProps
  extends HTMLAttributes<HTMLDivElement> {}

const ChatUserMessageFormContent: FC<ChatUserMessageFormContentProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <form
      className={cn(
        "rounded-xl px-4 py-2 bg-accent flex flex-col gap-2",
        className
      )}
      {...rest}
    >
      {children}
    </form>
  );
};

interface ChatUserMessageFormInputProps
  extends HTMLAttributes<HTMLDivElement> {}

const ChatUserMessageFormInput: FC<ChatUserMessageFormInputProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={cn("flex-1", className)} {...rest}>
      {children}
    </div>
  );
};

interface ChatUserMessageFormFooterProps
  extends HTMLAttributes<HTMLDivElement> {}

const ChatUserMessageFormFooter: FC<ChatUserMessageFormFooterProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={cn("flex items-center justify-end", className)} {...rest}>
      {children}
    </div>
  );
};

interface ChatUserMessageFormCancelProps
  extends ComponentProps<typeof Button> {}

const ChatUserMessageFormCancel: FC<ChatUserMessageFormCancelProps> = ({
  className,
  ...rest
}) => {
  return (
    <Button
      type="submit"
      variant="secondary"
      className={cn("", className)}
      {...rest}
    >
      Cancel
    </Button>
  );
};

interface ChatUserMessageFormSubmitProps
  extends ComponentProps<typeof Button> {}

const ChatUserMessageFormSubmit: FC<ChatUserMessageFormSubmitProps> = ({
  className,
  ...rest
}) => {
  return (
    <Button type="submit" className={cn("", className)} {...rest}>
      Send
    </Button>
  );
};

export {
  ChatUserMessageForm,
  ChatUserMessageFormCancel,
  ChatUserMessageFormContent,
  ChatUserMessageFormFooter,
  ChatUserMessageFormInput,
  ChatUserMessageFormSubmit,
};
