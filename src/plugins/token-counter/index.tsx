import type { Plugin } from "@/lib/plugin";
import { TokenCounter } from "./token-counter";

export default {
  composer: [TokenCounter],
} satisfies Plugin;
