import { z } from "zod";

/**
 * Extension lifecycle states
 */
export enum ExtensionStatus {
  INACTIVE = "inactive",
  LOADING = "loading",
  ACTIVE = "active",
  ERROR = "error",
  DISABLED = "disabled",
}

/**
 * Extension capabilities and entry points
 */
export const ExtensionManifestSchema = z.object({
  // Basic metadata
  id: z.string().min(1),
  name: z.string().min(1),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  description: z.string().optional(),
  author: z.string().optional(),
  license: z.string().optional(),
  keywords: z.array(z.string()).optional(),

  // Dependencies
  dependencies: z.record(z.string(), z.string()).optional(),
  peerDependencies: z.record(z.string(), z.string()).optional(),

  // Extension capabilities
  capabilities: z.object({
    // Client-side capabilities
    client: z
      .object({
        components: z.array(z.string()).optional(),
        pages: z.array(z.string()).optional(),
        routes: z.array(z.string()).optional(),
        layouts: z.array(z.string()).optional(),
        hooks: z.array(z.string()).optional(),
        providers: z.array(z.string()).optional(),
        themes: z.array(z.string()).optional(),
        plugins: z.array(z.string()).optional(),
      })
      .optional(),

    // Server-side capabilities
    server: z
      .object({
        routes: z.array(z.string()).optional(),
        middleware: z.array(z.string()).optional(),
        services: z.array(z.string()).optional(),
        jobs: z.array(z.string()).optional(),
        events: z.array(z.string()).optional(),
      })
      .optional(),

    // Shared capabilities
    shared: z
      .object({
        utils: z.array(z.string()).optional(),
        types: z.array(z.string()).optional(),
        constants: z.array(z.string()).optional(),
      })
      .optional(),
  }),

  // Extension points this extension provides
  extensionPoints: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional(),
        type: z.enum([
          "component",
          "page",
          "route",
          "service",
          "middleware",
          "hook",
        ]),
        schema: z.any().optional(), // JSON schema for the extension point
      })
    )
    .optional(),

  // Extension points this extension uses
  consumes: z.array(z.string()).optional(),

  // Permissions required by this extension
  permissions: z.array(z.string()).optional(),

  // Configuration schema
  configSchema: z.any().optional(),

  // Entry points
  main: z.string().optional(),
  client: z.string().optional(),
  server: z.string().optional(),

  // Bundle information
  bundle: z
    .object({
      client: z.string().optional(),
      server: z.string().optional(),
      shared: z.string().optional(),
    })
    .optional(),
});

export type ExtensionManifest = z.infer<typeof ExtensionManifestSchema>;

/**
 * Extension instance interface
 */
export interface Extension {
  manifest: ExtensionManifest;
  status: ExtensionStatus;
  instance?: any;
  error?: Error;
  config?: Record<string, any>;
  loadedAt?: Date;
  activatedAt?: Date;
}

/**
 * Extension point interface
 */
export interface ExtensionPoint {
  id: string;
  name: string;
  description?: string;
  type: "component" | "page" | "route" | "service" | "middleware" | "hook";
  schema?: any;
  extensions: Extension[];
}

/**
 * Extension registry configuration
 */
export interface ExtensionRegistryConfig {
  // Extension discovery
  extensionPaths: string[];
  autoDiscover: boolean;

  // Loading behavior
  loadOnDemand: boolean;
  lazyLoad: boolean;

  // Security
  enableSandbox: boolean;
  allowedPermissions: string[];

  // Development
  devMode: boolean;
  hotReload: boolean;
}

/**
 * Extension loading context
 */
export interface ExtensionContext {
  extension: Extension;
  registry: any; // Will be typed as ExtensionRegistry
  config: Record<string, any>;
  logger: {
    debug: (message: string, ...args: any[]) => void;
    info: (message: string, ...args: any[]) => void;
    warn: (message: string, ...args: any[]) => void;
    error: (message: string, ...args: any[]) => void;
  };
}
