import type { Plugin } from "@/lib/plugin";
import { CoreChat } from "./ui/core-chat";

export default {
  routes: [
    {
      path: "/",
      Component: CoreChat,
    },
  ],
} satisfies Plugin;
