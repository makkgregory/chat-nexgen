import type { Plugin } from "@/lib/plugin";
import collections from "./collections";
import core from "./core/";
import dashboards from "./dashboards";
import tokenCounter from "./token-counter";

const plugins: Plugin[] = [core, collections, tokenCounter, dashboards];

export default {
  routes: plugins.flatMap((plugin) => plugin.routes ?? []),
  composer: plugins.flatMap((plugin) => plugin.composer ?? []),
} satisfies Required<Plugin>;
