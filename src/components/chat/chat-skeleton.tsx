import { cn } from "@/lib/cn";
import type { FC, HTMLAttributes } from "react";
import { Skeleton } from "../ui/skeleton";

interface ChatSkeletonProps extends HTMLAttributes<HTMLDivElement> {}

const ChatSkeleton: FC<ChatSkeletonProps> = ({
  className,
  children,
  ...rest
}) => {
  return null;

  return (
    <div
      className={cn("flex flex-col max-w-3xl mx-auto h-full py-6", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

interface ChatSkeletonMessageListProps extends HTMLAttributes<HTMLDivElement> {}

const ChatSkeletonMessageList: FC<ChatSkeletonMessageListProps> = ({
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 flex-1 min-h-0 overflow-hidden",
        className
      )}
      {...rest}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn(
            "rounded-md flex-none w-2/3",
            index % 2 === 0 && "self-end h-12",
            index % 2 === 1 && "h-48"
          )}
        />
      ))}
    </div>
  );
};

interface ChatSkeletonComposerProps extends HTMLAttributes<HTMLDivElement> {}

const ChatSkeletonComposer: FC<ChatSkeletonComposerProps> = ({
  className,
  ...rest
}) => {
  return <Skeleton className={cn("h-32 rounded-xl", className)} {...rest} />;
};

export { ChatSkeleton, ChatSkeletonComposer, ChatSkeletonMessageList };
