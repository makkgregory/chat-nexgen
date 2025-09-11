import type { Plugin } from "@/lib/plugin";
import { Citation } from "./citation";
import { citationPlugin } from "./citation-plugin";

export default {
  rehypePlugins: [citationPlugin],
  content: {
    Citation,
  },
} satisfies Plugin;
