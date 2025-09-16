import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";
import type { FC, HTMLAttributes } from "react";
import { useChat } from "../../context/chat-context";

interface ChatLandingProps extends HTMLAttributes<HTMLDivElement> {}

const ChatLanding: FC<ChatLandingProps> = ({
  className,
  children,
  ...rest
}) => {
  const { history } = useChat();

  if (!history.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center pt-48 max-w-3xl mx-auto h-full",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

interface ChatLandingAvatarProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
}

const ChatLandingAvatar: FC<ChatLandingAvatarProps> = ({
  src,
  className,
  ...rest
}) => {
  return (
    <Avatar className={cn("size-16 mb-4", className)} {...rest}>
      <AvatarImage src={src} />
    </Avatar>
  );
};

interface ChatLandingTitleProps extends HTMLAttributes<HTMLDivElement> {}

const ChatLandingTitle: FC<ChatLandingTitleProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <h2 className={cn("text-2xl text-center mb-0.5", className)} {...rest}>
      {children}
    </h2>
  );
};

interface ChatLandingDescriptionProps extends HTMLAttributes<HTMLDivElement> {}

const ChatLandingDescription: FC<ChatLandingDescriptionProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <p className={cn("text-muted-foreground mb-4", className)} {...rest}>
      {children}
    </p>
  );
};

interface ChatLandingStarterProps extends HTMLAttributes<HTMLDivElement> {}

const ChatLandingStarter: FC<ChatLandingStarterProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={cn("mb-4", className)} {...rest}>
      {children}
    </div>
  );
};

interface ChatLandingComposerProps extends HTMLAttributes<HTMLDivElement> {}

const ChatLandingComposer: FC<ChatLandingComposerProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={cn("mt-8 w-full", className)} {...rest}>
      {children}
    </div>
  );
};

export {
  ChatLanding,
  ChatLandingAvatar,
  ChatLandingComposer,
  ChatLandingDescription,
  ChatLandingStarter,
  ChatLandingTitle,
};
