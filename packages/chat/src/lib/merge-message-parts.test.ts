import { describe, expect, it } from "vitest";
import {
  messageMarkdownPart,
  messageTextPart,
  type MessagePart,
} from "../models/message";
import { mergeMessageParts } from "./merge-message-parts";

describe("mergeMessageParts", () => {
  describe("merging text parts", () => {
    it("should merge consecutive text parts", () => {
      const parts: MessagePart[] = [
        messageTextPart("Hello "),
        messageTextPart("world"),
        messageTextPart("!"),
      ];

      const result = mergeMessageParts(parts);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(messageTextPart("Hello world!"));
    });

    it("should merge only consecutive text parts", () => {
      const parts: MessagePart[] = [
        messageTextPart("Hello "),
        messageTextPart("world"),
        messageMarkdownPart("**bold**"),
        messageTextPart("foo"),
        messageTextPart("bar"),
      ];

      const result = mergeMessageParts(parts);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(messageTextPart("Hello world"));
      expect(result[1]).toEqual(messageMarkdownPart("**bold**"));
      expect(result[2]).toEqual(messageTextPart("foobar"));
    });
  });

  describe("merging markdown parts", () => {
    it("should merge consecutive markdown parts", () => {
      const parts: MessagePart[] = [
        messageMarkdownPart("**Hello** "),
        messageMarkdownPart("*world*"),
        messageMarkdownPart("!"),
      ];

      const result = mergeMessageParts(parts);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(messageMarkdownPart("**Hello** *world*!"));
    });

    it("should merge only consecutive markdown parts", () => {
      const parts: MessagePart[] = [
        messageMarkdownPart("**Hello** "),
        messageMarkdownPart("*world*"),
        messageTextPart("plain text"),
        messageMarkdownPart("more "),
        messageMarkdownPart("markdown"),
      ];

      const result = mergeMessageParts(parts);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(messageMarkdownPart("**Hello** *world*"));
      expect(result[1]).toEqual(messageTextPart("plain text"));
      expect(result[2]).toEqual(messageMarkdownPart("more markdown"));
    });
  });

  describe("mixed types", () => {
    it("should not merge different part types", () => {
      const parts: MessagePart[] = [
        messageTextPart("text"),
        messageMarkdownPart("markdown"),
        messageTextPart("more text"),
      ];

      const result = mergeMessageParts(parts);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(messageTextPart("text"));
      expect(result[1]).toEqual(messageMarkdownPart("markdown"));
      expect(result[2]).toEqual(messageTextPart("more text"));
    });

    it("should handle alternating types correctly", () => {
      const parts: MessagePart[] = [
        messageTextPart("a"),
        messageMarkdownPart("b"),
        messageTextPart("c"),
        messageMarkdownPart("d"),
      ];

      const result = mergeMessageParts(parts);

      expect(result).toHaveLength(4);
      expect(result[0]).toEqual(messageTextPart("a"));
      expect(result[1]).toEqual(messageMarkdownPart("b"));
      expect(result[2]).toEqual(messageTextPart("c"));
      expect(result[3]).toEqual(messageMarkdownPart("d"));
    });
  });

  describe("edge cases", () => {
    it("should handle empty array", () => {
      const parts: MessagePart[] = [];

      const result = mergeMessageParts(parts);

      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    it("should handle single text part", () => {
      const parts: MessagePart[] = [messageTextPart("single")];

      const result = mergeMessageParts(parts);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(messageTextPart("single"));
    });

    it("should handle single markdown part", () => {
      const parts: MessagePart[] = [messageMarkdownPart("*single*")];

      const result = mergeMessageParts(parts);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(messageMarkdownPart("*single*"));
    });

    it("should handle empty text parts", () => {
      const parts: MessagePart[] = [
        messageTextPart(""),
        messageTextPart("hello"),
        messageTextPart(""),
      ];

      const result = mergeMessageParts(parts);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(messageTextPart("hello"));
    });

    it("should handle empty markdown parts", () => {
      const parts: MessagePart[] = [
        messageMarkdownPart(""),
        messageMarkdownPart("**bold**"),
        messageMarkdownPart(""),
      ];

      const result = mergeMessageParts(parts);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(messageMarkdownPart("**bold**"));
    });
  });

  describe("complex scenarios", () => {
    it("should handle complex mixed merging scenario", () => {
      const parts: MessagePart[] = [
        messageTextPart("Start "),
        messageTextPart("text "),
        messageMarkdownPart("**bold** "),
        messageMarkdownPart("*italic*"),
        messageTextPart(" end"),
        messageTextPart(" final"),
      ];

      const result = mergeMessageParts(parts);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(messageTextPart("Start text "));
      expect(result[1]).toEqual(messageMarkdownPart("**bold** *italic*"));
      expect(result[2]).toEqual(messageTextPart(" end final"));
    });

    it("should preserve original parts array (immutability)", () => {
      const originalParts: MessagePart[] = [
        messageTextPart("hello"),
        messageTextPart(" world"),
      ];
      const partsCopy = [...originalParts];

      mergeMessageParts(originalParts);

      expect(originalParts).toEqual(partsCopy);
    });
  });
});
