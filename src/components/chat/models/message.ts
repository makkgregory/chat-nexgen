import { z } from "zod";

export const MessageTextPart = z.object({
  type: z.literal("text"),
  text: z.string(),
});

export type MessageTextPart = z.infer<typeof MessageTextPart>;

export const messageTextPart = (text: string): MessageTextPart => ({
  type: "text",
  text,
});

export const MessageMarkdownPart = z.object({
  type: z.literal("markdown"),
  markdown: z.string(),
});

export type MessageMarkdownPart = z.infer<typeof MessageMarkdownPart>;

export const messageMarkdownPart = (markdown: string): MessageMarkdownPart => ({
  type: "markdown",
  markdown,
});

export const MessagePart = z.union([MessageTextPart, MessageMarkdownPart]);
export type MessagePart = z.infer<typeof MessagePart>;

export type MessagePartType = MessagePart["type"];

export const UserMessage = z.object({
  id: z.string(),
  role: z.literal("user"),
  parts: z.array(MessagePart),
});

export type UserMessage = z.infer<typeof UserMessage>;

export const AssistantMessage = z.object({
  id: z.string(),
  role: z.literal("assistant"),
  parts: z.array(MessagePart),
});

export type AssistantMessage = z.infer<typeof AssistantMessage>;

export const Message = z.union([UserMessage, AssistantMessage]);

export type Message = z.infer<typeof Message>;
