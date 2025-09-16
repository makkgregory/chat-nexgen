import {
  ChatAssistantMessage,
  ChatComposer,
  ChatComposerDescription,
  ChatComposerInput,
  ChatHistory,
  ChatLanding,
  ChatLandingAvatar,
  ChatLandingComposer,
  ChatLandingDescription,
  ChatLandingTitle,
  ChatLayout,
  ChatMain,
  ChatRoot,
  ChatStarter,
  ChatStarterItem,
  ChatStarterItemDescription,
  ChatStarterItemLabel,
  ChatThinking,
  ChatUserMessage,
} from "@/components/chat";
import { cn } from "@/lib/cn";
import type { FC, HTMLAttributes } from "react";
import { WeatherPrompt } from "../prompts/weather-prompt";

interface CoreChatProps extends HTMLAttributes<HTMLDivElement> {}

export const CoreChat: FC<CoreChatProps> = ({ className, ...rest }) => {
  return (
    <ChatRoot className={cn("", className)} {...rest}>
      <CoreChatLanding />
      <CoreChatLayout />
    </ChatRoot>
  );
};

const CoreChatLanding: FC = (props) => {
  return (
    <ChatLanding {...props}>
      <ChatLandingAvatar src="https://github.com/shadcn.png" />
      <ChatLandingTitle>What can I help you with?</ChatLandingTitle>
      <ChatLandingDescription>
        Start by typing a message or choose one of the example prompts below.
      </ChatLandingDescription>

      <CoreChatStarter />

      <ChatLandingComposer>
        <CoreChatComposer />
      </ChatLandingComposer>
    </ChatLanding>
  );
};

const CoreChatStarter: FC = (props) => {
  return (
    <ChatStarter {...props}>
      <ChatStarterItem prompt={WeatherPrompt}>
        <ChatStarterItemLabel>Weather</ChatStarterItemLabel>
        <ChatStarterItemDescription>
          Get the current weather information
        </ChatStarterItemDescription>
      </ChatStarterItem>
    </ChatStarter>
  );
};

const CoreChatLayout: FC = (props) => {
  return (
    <ChatLayout direction="horizontal" {...props}>
      <ChatMain>
        <ChatHistory>
          {(message) => {
            switch (message.role) {
              case "user":
                return <ChatUserMessage message={message} />;
              case "assistant":
                return <ChatAssistantMessage message={message} />;
            }
          }}
        </ChatHistory>
        <ChatThinking />
        <CoreChatComposer />
      </ChatMain>
    </ChatLayout>
  );
};

const CoreChatComposer: FC = (props) => {
  return (
    <ChatComposer {...props}>
      <ChatComposerInput />
      <ChatComposerDescription>
        AI can make mistakes. Please verify any information it provides.
      </ChatComposerDescription>
    </ChatComposer>
  );
};
