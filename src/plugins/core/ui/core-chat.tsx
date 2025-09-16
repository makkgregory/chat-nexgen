import {
  ChatAside,
  ChatComposer,
  ChatComposerDescription,
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

const CoreChatLanding: FC = () => {
  return (
    <ChatLanding>
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

const CoreChatStarter: FC = () => {
  return (
    <ChatStarter>
      <ChatStarterItem prompt={WeatherPrompt}>
        <ChatStarterItemLabel>Weather</ChatStarterItemLabel>
        <ChatStarterItemDescription>
          Get the current weather information
        </ChatStarterItemDescription>
      </ChatStarterItem>
    </ChatStarter>
  );
};

const CoreChatLayout: FC = () => {
  return (
    <ChatLayout direction="horizontal">
      <ChatMain>
        <ChatHistory />
        <CoreChatComposer />
      </ChatMain>
      <ChatAside maxSize={75} />
    </ChatLayout>
  );
};

const CoreChatComposer: FC = () => {
  return (
    <ChatComposer>
      <ChatComposerDescription>
        AI can make mistakes. Please verify any information it provides.
      </ChatComposerDescription>
    </ChatComposer>
  );
};
