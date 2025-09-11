import { ChatComposer } from "@/components/chat/chat-composer";
import { ChatContent } from "@/components/chat/chat-content";
import {
  ChatLanding,
  ChatLandingAvatar,
  ChatLandingComposer,
  ChatLandingDescription,
  ChatLandingStarter,
  ChatLandingTitle,
} from "@/components/chat/chat-landing";
import { ChatRoot } from "@/components/chat/chat-root";
import { ChatSend } from "@/components/chat/chat-send";
import {
  ChatSkeleton,
  ChatSkeletonComposer,
  ChatSkeletonMessageList,
} from "@/components/chat/chat-skeleton";
import {
  ChatStarter,
  ChatStarterItem,
  ChatStarterItemDescription,
  ChatStarterItemLabel,
} from "@/components/chat/chat-starter";
import { ChatTools } from "@/components/chat/chat-tools";
import { cn } from "@/lib/cn";
import type { FC, HTMLAttributes } from "react";

interface DashboardChatProps extends HTMLAttributes<HTMLDivElement> {}

export const DashboardChat: FC<DashboardChatProps> = ({
  className,
  ...rest
}) => {
  return (
    <ChatRoot className={cn("", className)} {...rest}>
      <ChatSkeleton>
        <ChatSkeletonMessageList />
        <ChatSkeletonComposer />
      </ChatSkeleton>

      <ChatLanding>
        <ChatLandingAvatar src="https://github.com/shadcn.png" />
        <ChatLandingTitle>Dashboard builder</ChatLandingTitle>
        <ChatLandingDescription>
          Build custom dashboards by asking questions about your data
        </ChatLandingDescription>

        <ChatLandingStarter>
          <ChatStarter>
            <ChatStarterItem>
              <ChatStarterItemLabel>Create a sales report</ChatStarterItemLabel>
              <ChatStarterItemDescription>
                "Show me the sales report for the last quarter"
              </ChatStarterItemDescription>
            </ChatStarterItem>

            <ChatStarterItem>
              <ChatStarterItemLabel>Customer insights</ChatStarterItemLabel>
              <ChatStarterItemDescription>
                "What are the demographics of my customers?"
              </ChatStarterItemDescription>
            </ChatStarterItem>
          </ChatStarter>
        </ChatLandingStarter>

        <ChatLandingComposer>
          <ChatComposer>
            <ChatTools />
            <ChatSend />
          </ChatComposer>
        </ChatLandingComposer>
      </ChatLanding>

      <ChatContent>
        <ChatComposer>
          <ChatTools />
          <ChatSend />
        </ChatComposer>
      </ChatContent>
    </ChatRoot>
  );
};
