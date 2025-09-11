import type { Plugin } from "@/lib/plugin";
import { AgentModeTool } from "./agent-mode-tool";
import { CollectionsTool } from "./collections-tool";

export default {
  routes: [
    {
      path: "/collections/chat",
      lazy: async () => {
        const { CollectionChat } = await import("./collection-chat");
        return { Component: CollectionChat };
      },
    },
  ],
  tools: [CollectionsTool, AgentModeTool],
} satisfies Plugin;
