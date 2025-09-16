import type { MessagePart } from "../models/message";

export const getMessagePartsText = (parts: MessagePart[]) => {
  return parts.reduce((text, part) => {
    switch (part.type) {
      case "text":
        return text + part.text;
      case "markdown":
        return text + part.markdown;
      default:
        return text;
    }
  }, "");
};
