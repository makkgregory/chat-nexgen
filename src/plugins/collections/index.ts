import type { Plugin } from "@/lib/plugin";

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
} satisfies Plugin;
