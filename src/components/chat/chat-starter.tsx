import { cn } from "@/lib/cn";
import type { FC, HTMLAttributes } from "react";

interface ChatStarterProps extends HTMLAttributes<HTMLUListElement> {}

const ChatStarter: FC<ChatStarterProps> = ({ className, ...rest }) => {
  return (
    <ul className={cn("grid grid-cols-3 gap-4", className)} {...rest}></ul>
  );
};

interface ChatStarterItemProps extends HTMLAttributes<HTMLLIElement> {}

const ChatStarterItem: FC<ChatStarterItemProps> = ({ className, ...rest }) => {
  return (
    <li
      className={cn(
        "rounded-xl p-4 bg-muted text-sm cursor-pointer hover:bg-muted/65 select-none",
        className
      )}
      {...rest}
    ></li>
  );
};

interface ChatStarterItemLabelProps extends HTMLAttributes<HTMLDivElement> {}

const ChatStarterItemLabel: FC<ChatStarterItemLabelProps> = ({
  className,
  ...rest
}) => {
  return <div className={cn("", className)} {...rest}></div>;
};

interface ChatStarterItemDescriptionProps
  extends HTMLAttributes<HTMLDivElement> {}

const ChatStarterItemDescription: FC<ChatStarterItemDescriptionProps> = ({
  className,
  ...rest
}) => {
  return (
    <p className={cn("text-muted-foreground text-xs", className)} {...rest}></p>
  );
};

export {
  ChatStarter,
  ChatStarterItem,
  ChatStarterItemDescription,
  ChatStarterItemLabel,
};
