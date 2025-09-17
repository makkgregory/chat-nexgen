import { extensionAdapter } from "@/lib/extension-adapter";
import type { Plugin } from "@/lib/plugin";
import core from "./core/";

// Core plugins (always available)
const corePlugins: Plugin[] = [core];

// Initialize plugins with extension system
async function initializePlugins(): Promise<Required<Plugin>> {
  // Initialize extensions
  await extensionAdapter.initialize();

  const allPlugins = [...corePlugins, ...extensionAdapter.getPlugins()];

  return {
    routes: allPlugins.flatMap((plugin) => plugin.routes ?? []),
    composer: allPlugins.flatMap((plugin) => plugin.composer ?? []),
    tools: allPlugins.flatMap((plugin) => plugin.tools ?? []),
    content: Object.assign({}, ...allPlugins.map((p) => p.content ?? {})),
    rehypePlugins: allPlugins.flatMap((plugin) => plugin.rehypePlugins ?? []),
    remarkPlugins: allPlugins.flatMap((plugin) => plugin.remarkPlugins ?? []),
  } satisfies Required<Plugin>;
}

// Synchronous fallback for development (without extensions)
const defaultPlugins: Required<Plugin> = {
  routes: corePlugins.flatMap((plugin) => plugin.routes ?? []),
  composer: corePlugins.flatMap((plugin) => plugin.composer ?? []),
  tools: corePlugins.flatMap((plugin) => plugin.tools ?? []),
  content: Object.assign({}, ...corePlugins.map((p) => p.content ?? {})),
  rehypePlugins: corePlugins.flatMap((plugin) => plugin.rehypePlugins ?? []),
  remarkPlugins: corePlugins.flatMap((plugin) => plugin.remarkPlugins ?? []),
};

export { initializePlugins };
export default defaultPlugins;
