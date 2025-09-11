import type { Plugin } from "@/lib/plugin";
import citations from "./citations";
import collections from "./collections";
import core from "./core/";
import dashboards from "./dashboards";
import tokenCounter from "./token-counter";

const plugins: Plugin[] = [
  core,
  collections,
  tokenCounter,
  dashboards,
  citations,
];

export default {
  routes: plugins.flatMap((plugin) => plugin.routes ?? []),
  composer: plugins.flatMap((plugin) => plugin.composer ?? []),
  tools: plugins.flatMap((plugin) => plugin.tools ?? []),
  content: Object.assign({}, ...plugins.map((p) => p.content ?? {})),
  rehypePlugins: plugins.flatMap((plugin) => plugin.rehypePlugins ?? []),
  remarkPlugins: plugins.flatMap((plugin) => plugin.remarkPlugins ?? []),
} satisfies Required<Plugin>;
