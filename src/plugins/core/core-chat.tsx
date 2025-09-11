import { ChatComposer } from "@/components/chat/chat-composer";
import { ChatContent } from "@/components/chat/chat-content";
import {
  ChatLanding,
  ChatLandingAvatar,
  ChatLandingComposer,
  ChatLandingDescription,
  ChatLandingTitle,
} from "@/components/chat/chat-landing";
import { ChatMessageList } from "@/components/chat/chat-message-list";
import { ChatRoot } from "@/components/chat/chat-root";
import { ChatSend } from "@/components/chat/chat-send";

import { ChatTools } from "@/components/chat/chat-tools";
import { cn } from "@/lib/cn";
import type { FC, HTMLAttributes } from "react";

interface CoreChatProps extends HTMLAttributes<HTMLDivElement> {}

export const CoreChat: FC<CoreChatProps> = ({ className, ...rest }) => {
  return (
    <ChatRoot className={cn("", className)} {...rest}>
      <ChatLanding>
        <ChatLandingAvatar src="https://github.com/shadcn.png" />
        <ChatLandingTitle>What can I help you with?</ChatLandingTitle>
        <ChatLandingDescription>
          Start by typing a message or choose one of the example prompts below.
        </ChatLandingDescription>

        <ChatLandingComposer>
          <ChatComposer>
            <ChatTools />
            <ChatSend />
          </ChatComposer>
        </ChatLandingComposer>
      </ChatLanding>

      <ChatContent>
        <ChatMessageList />
        <ChatComposer>
          <ChatTools />
          <ChatSend />
        </ChatComposer>
      </ChatContent>
    </ChatRoot>
  );
};
