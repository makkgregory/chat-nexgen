import { TRPCExample } from "@/components/trpc-example";
import type { Plugin } from "@/lib/plugin";
import { CoreChat } from "./ui/core-chat";

export default {
  routes: [
    {
      path: "/",
      Component: CoreChat,
    },
    {
      path: "/example",
      Component: TRPCExample,
    },
  ],
} satisfies Plugin;
