import type { Plugin } from "@/lib/plugin";
import { DashboardsTool } from "./dashboards-tool";

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
  tools: [DashboardsTool],
} satisfies Plugin;
