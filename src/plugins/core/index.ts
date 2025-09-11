import type { Plugin } from "@/lib/plugin";
import { CoreChat } from "./core-chat";
import { CoreTool } from "./core-tool";

export default {
  routes: [
    {
      path: "/",
      Component: CoreChat,
    },
  ],
  tools: [CoreTool],
} satisfies Plugin;
