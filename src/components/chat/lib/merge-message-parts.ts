import {
  messageMarkdownPart,
  messageTextPart,
  type MessagePart,
} from "../models/message";

export const mergeMessageParts = (parts: MessagePart[]): MessagePart[] => {
  return parts.reduce((acc, part) => {
    const last = acc.at(-1);
    if (last?.type === "text" && part.type === "text") {
      const text = last.text + part.text;
      acc[acc.length - 1] = messageTextPart(text);
      return acc;
    }

    if (last?.type === "markdown" && part.type === "markdown") {
      const markdown = last.markdown + part.markdown;
      acc[acc.length - 1] = messageMarkdownPart(markdown);
      return acc;
    }

    acc.push(part);
    return acc;
  }, [] as MessagePart[]);
};
