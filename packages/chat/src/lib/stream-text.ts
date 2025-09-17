import {
  messageMarkdownPart,
  type Message,
  type MessagePart,
} from "../models/message";
import { streamText as aiStreamText, type ModelMessage } from "ai";
import { createOllama } from "ollama-ai-provider-v2";
import { getMessagePartsText } from "./get-message-parts-text";

export const ollama = createOllama({
  baseURL: "http://localhost:11434/api",
});

interface StreamTextOptions {
  history: Message[];
  signal?: AbortSignal;
}

export async function* streamText({
  history,
  signal,
}: StreamTextOptions): AsyncIterable<MessagePart> {
  const stream = aiStreamText({
    model: ollama("llama3:latest"),
    messages: getModelHistory(history),
    abortSignal: signal,
  }).toUIMessageStream();

  for await (const chunk of stream) {
    switch (chunk.type) {
      case "text-delta":
        yield messageMarkdownPart(chunk.delta);
    }
  }
}

const getModelHistory = (history: Message[]): ModelMessage[] => {
  return history.map((message) => ({
    role: message.role,
    content: getMessagePartsText(message.parts),
  }));
};
