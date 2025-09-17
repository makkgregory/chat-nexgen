import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { RouteObject } from "react-router";
import { ExtensionRegistry } from "../core/registry";
import type { Extension, ExtensionManifest } from "../core/types";

/**
 * Client-side extension point types
 */
export interface ComponentExtensionPoint {
  id: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  priority?: number;
}

export interface PageExtensionPoint {
  id: string;
  path: string;
  component: React.ComponentType<any>;
  layout?: React.ComponentType<any>;
  meta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface RouteExtensionPoint {
  id: string;
  routes: RouteObject[];
}

export interface LayoutExtensionPoint {
  id: string;
  component: React.ComponentType<{ children: ReactNode }>;
  zones?: string[];
}

export interface ProviderExtensionPoint {
  id: string;
  component: React.ComponentType<{ children: ReactNode }>;
  priority?: number;
}

/**
 * Client extension registry context
 */
interface ClientExtensionContextValue {
  registry: ExtensionRegistry;
  extensions: Extension[];
  isLoading: boolean;
  error?: Error;

  // Extension point helpers
  getComponents: (pointId: string) => ComponentExtensionPoint[];
  getPages: () => PageExtensionPoint[];
  getRoutes: () => RouteObject[];
  getLayouts: () => LayoutExtensionPoint[];
  getProviders: () => ProviderExtensionPoint[];

  // Extension management
  loadExtension: (extensionId: string) => Promise<void>;
  unloadExtension: (extensionId: string) => Promise<void>;
}

const ClientExtensionContext =
  createContext<ClientExtensionContextValue | null>(null);

/**
 * Client extension provider props
 */
interface ClientExtensionProviderProps {
  children: ReactNode;
  registry?: ExtensionRegistry;
  extensions?: ExtensionManifest[];
  autoLoad?: boolean;
}

/**
 * Client extension provider component
 */
export function ClientExtensionProvider({
  children,
  registry: providedRegistry,
  extensions: initialExtensions = [],
  autoLoad = true,
}: ClientExtensionProviderProps) {
  const [registry] = useState(
    () =>
      providedRegistry ||
      new ExtensionRegistry({
        devMode: process.env.NODE_ENV === "development",
        hotReload: process.env.NODE_ENV === "development",
      })
  );

  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  // Load initial extensions
  useEffect(() => {
    if (autoLoad && initialExtensions.length > 0) {
      setIsLoading(true);
      Promise.all(
        initialExtensions.map((manifest) =>
          registry.registerExtension(manifest, async () => {
            // Dynamic import based on client entry point
            if (manifest.client) {
              return import(manifest.client);
            }
            if (manifest.main) {
              return import(manifest.main);
            }
            throw new Error(
              `No client entry point found for extension ${manifest.id}`
            );
          })
        )
      )
        .then(() => {
          setExtensions(registry.getAllExtensions());
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
        });
    }
  }, [registry, initialExtensions, autoLoad]);

  // Listen to registry events
  useEffect(() => {
    const updateExtensions = () => setExtensions(registry.getAllExtensions());

    registry.on("extension:registered", updateExtensions);
    registry.on("extension:loaded", updateExtensions);
    registry.on("extension:unregistered", updateExtensions);

    return () => {
      registry.off("extension:registered", updateExtensions);
      registry.off("extension:loaded", updateExtensions);
      registry.off("extension:unregistered", updateExtensions);
    };
  }, [registry]);

  // Helper functions
  const getComponents = (pointId: string): ComponentExtensionPoint[] => {
    return extensions
      .filter((ext) => ext.instance?.components?.[pointId])
      .map((ext) => ({
        id: `${ext.manifest.id}.${pointId}`,
        component: ext.instance.components[pointId],
        priority:
          ext.manifest.capabilities?.client?.components?.indexOf(pointId) || 0,
      }))
      .sort((a, b) => (a.priority || 0) - (b.priority || 0));
  };

  const getPages = (): PageExtensionPoint[] => {
    return extensions
      .filter((ext) => ext.instance?.pages)
      .flatMap((ext) =>
        Object.entries(ext.instance.pages || {}).map(
          ([id, pageConfig]: [string, any]) => ({
            id: `${ext.manifest.id}.${id}`,
            path: pageConfig.path,
            component: pageConfig.component,
            layout: pageConfig.layout,
            meta: pageConfig.meta,
          })
        )
      );
  };

  const getRoutes = (): RouteObject[] => {
    return extensions
      .filter((ext) => ext.instance?.routes)
      .flatMap((ext) => ext.instance.routes || []);
  };

  const getLayouts = (): LayoutExtensionPoint[] => {
    return extensions
      .filter((ext) => ext.instance?.layouts)
      .flatMap((ext) =>
        Object.entries(ext.instance.layouts || {}).map(
          ([id, layout]: [string, any]) => ({
            id: `${ext.manifest.id}.${id}`,
            component: layout.component,
            zones: layout.zones,
          })
        )
      );
  };

  const getProviders = (): ProviderExtensionPoint[] => {
    return extensions
      .filter((ext) => ext.instance?.providers)
      .flatMap((ext) =>
        Object.entries(ext.instance.providers || {}).map(
          ([id, provider]: [string, any]) => ({
            id: `${ext.manifest.id}.${id}`,
            component: provider.component,
            priority: provider.priority || 0,
          })
        )
      )
      .sort((a, b) => (a.priority || 0) - (b.priority || 0));
  };

  const loadExtension = async (extensionId: string) => {
    setIsLoading(true);
    try {
      await registry.loadExtension(extensionId);
      setExtensions(registry.getAllExtensions());
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const unloadExtension = async (extensionId: string) => {
    try {
      await registry.unregisterExtension(extensionId);
      setExtensions(registry.getAllExtensions());
    } catch (err) {
      setError(err as Error);
    }
  };

  const contextValue: ClientExtensionContextValue = {
    registry,
    extensions,
    isLoading,
    error,
    getComponents,
    getPages,
    getRoutes,
    getLayouts,
    getProviders,
    loadExtension,
    unloadExtension,
  };

  return (
    <ClientExtensionContext.Provider value={contextValue}>
      {children}
    </ClientExtensionContext.Provider>
  );
}

/**
 * Hook to access client extension context
 */
export function useClientExtensions(): ClientExtensionContextValue {
  const context = useContext(ClientExtensionContext);
  if (!context) {
    throw new Error(
      "useClientExtensions must be used within a ClientExtensionProvider"
    );
  }
  return context;
}
