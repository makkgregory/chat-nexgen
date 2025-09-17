import {
  ChatAssistantMessage,
  ChatAssistantMessageContent,
  ChatAssistantMessageDelete,
  ChatAssistantMessageFooter,
  ChatAssistantMessageNoContent,
  ChatAssistantMessageParts,
  ChatAssistantMessageRetry,
  ChatAssistantMessageThinking,
  ChatComposer,
  ChatComposerContent,
  ChatComposerDescription,
  ChatComposerFooter,
  ChatComposerInput,
  ChatComposerSend,
  ChatComposerStop,
  ChatHistory,
  ChatLanding,
  ChatLandingAvatar,
  ChatLandingComposer,
  ChatLandingDescription,
  ChatLandingTitle,
  ChatLayout,
  ChatMain,
  ChatMainComposer,
  ChatMainScrollArea,
  ChatRoot,
  ChatStarter,
  ChatStarterItem,
  ChatStarterItemDescription,
  ChatStarterItemLabel,
  ChatUserMessage,
  ChatUserMessageContent,
  ChatUserMessageEdit,
  ChatUserMessageFooter,
  ChatUserMessageForm,
  ChatUserMessageFormCancel,
  ChatUserMessageFormContent,
  ChatUserMessageFormFooter,
  ChatUserMessageFormInput,
  ChatUserMessageFormSubmit,
  ChatUserMessageParts,
} from "@chat-ai/chat";
import { cn } from "@chat-ai/ui";
import type { FC, HTMLAttributes } from "react";
import { AppLayout } from "../../../components/app-layout";
import { WeatherPrompt } from "../prompts/weather-prompt";

interface CoreChatProps extends HTMLAttributes<HTMLDivElement> {}

export const CoreChat: FC<CoreChatProps> = ({ className, ...rest }) => {
  return (
    <AppLayout>
      <ChatRoot className={cn("h-[calc(100vh-3.5rem)]", className)} {...rest}>
        <CoreChatLanding />
        <CoreChatLayout />
      </ChatRoot>
    </AppLayout>
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
        <ChatMainScrollArea>
          <ChatHistory>
            {(message, props) => {
              switch (message.role) {
                case "user":
                  return (
                    <ChatUserMessage message={message} {...props}>
                      <ChatUserMessageContent>
                        <ChatUserMessageParts />
                        <ChatUserMessageFooter>
                          <ChatUserMessageEdit />
                        </ChatUserMessageFooter>
                      </ChatUserMessageContent>

                      <ChatUserMessageForm>
                        <ChatUserMessageFormContent>
                          <ChatUserMessageFormInput />
                          <ChatUserMessageFormFooter>
                            <ChatUserMessageFormCancel />
                            <ChatUserMessageFormSubmit />
                          </ChatUserMessageFormFooter>
                        </ChatUserMessageFormContent>
                      </ChatUserMessageForm>
                    </ChatUserMessage>
                  );
                case "assistant":
                  return (
                    <ChatAssistantMessage message={message} {...props}>
                      <ChatAssistantMessageContent>
                        <ChatAssistantMessageThinking />
                        <ChatAssistantMessageParts />
                        <ChatAssistantMessageNoContent />
                        <ChatAssistantMessageFooter>
                          <ChatAssistantMessageRetry className="-ml-2" />
                          <ChatAssistantMessageDelete />
                        </ChatAssistantMessageFooter>
                      </ChatAssistantMessageContent>
                    </ChatAssistantMessage>
                  );
              }
            }}
          </ChatHistory>
        </ChatMainScrollArea>
        <ChatMainComposer>
          <CoreChatComposer />
        </ChatMainComposer>
      </ChatMain>
    </ChatLayout>
  );
};

const CoreChatComposer: FC = (props) => {
  return (
    <ChatComposer {...props}>
      <ChatComposerContent>
        <ChatComposerInput />
        <ChatComposerFooter>
          <span className="flex-1" />
          <ChatComposerSend />
          <ChatComposerStop />
        </ChatComposerFooter>
      </ChatComposerContent>
      <ChatComposerDescription>
        AI can make mistakes. Please verify any information it provides.
      </ChatComposerDescription>
    </ChatComposer>
  );
};
