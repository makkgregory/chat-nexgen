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
import { ChatStop } from "@/components/chat/chat-stop";
import { ChatTools } from "@/components/chat/chat-tools";
import { cn } from "@/lib/cn";
import type { FC, HTMLAttributes } from "react";

interface CollectionChatProps extends HTMLAttributes<HTMLDivElement> {}

export const CollectionChat: FC<CollectionChatProps> = ({
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
        <ChatLandingTitle>Trading reports</ChatLandingTitle>
        <ChatLandingDescription>
          Ask questions about your NFT collection and get insights on trading
        </ChatLandingDescription>

        <ChatLandingStarter>
          <ChatStarter>
            <ChatStarterItem>
              <ChatStarterItemLabel>Ask about a document</ChatStarterItemLabel>
              <ChatStarterItemDescription>
                "What is the main topic of the document?"
              </ChatStarterItemDescription>
            </ChatStarterItem>

            <ChatStarterItem>
              <ChatStarterItemLabel>Latest trade activity</ChatStarterItemLabel>
              <ChatStarterItemDescription>
                "What are the most recent trades?"
              </ChatStarterItemDescription>
            </ChatStarterItem>

            <ChatStarterItem>
              <ChatStarterItemLabel>Floor price changes</ChatStarterItemLabel>
              <ChatStarterItemDescription>
                "How has the floor price changed over time?"
              </ChatStarterItemDescription>
            </ChatStarterItem>
          </ChatStarter>
        </ChatLandingStarter>

        <ChatLandingComposer>
          <ChatComposer>
            <ChatTools />
            <ChatSend />
            <ChatStop />
          </ChatComposer>
        </ChatLandingComposer>
      </ChatLanding>

      <ChatContent>
        <ChatComposer>
          <ChatTools />
          <ChatSend />
          <ChatStop />
        </ChatComposer>
      </ChatContent>
    </ChatRoot>
  );
};
