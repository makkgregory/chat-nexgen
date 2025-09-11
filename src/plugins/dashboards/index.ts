import type { Plugin } from "@/lib/plugin";

export default {
  routes: [
    {
      path: "/dashboards/chat",
      lazy: async () => {
        const { Dashboard } = await import("./dashboard");
        return { Component: Dashboard };
      },
    },
  ],
} satisfies Plugin;
