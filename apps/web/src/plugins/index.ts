import type { Plugin } from "@/lib/plugin";
import core from "./core/";

const plugins: Plugin[] = [core];

export default {
  routes: plugins.flatMap((plugin) => plugin.routes ?? []),
  composer: plugins.flatMap((plugin) => plugin.composer ?? []),
  tools: plugins.flatMap((plugin) => plugin.tools ?? []),
  content: Object.assign({}, ...plugins.map((p) => p.content ?? {})),
  rehypePlugins: plugins.flatMap((plugin) => plugin.rehypePlugins ?? []),
  remarkPlugins: plugins.flatMap((plugin) => plugin.remarkPlugins ?? []),
} satisfies Required<Plugin>;
