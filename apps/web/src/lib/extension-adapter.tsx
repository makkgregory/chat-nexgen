import type { Plugin } from "@/lib/plugin";
import { ExtensionRegistry } from "@chat-ai/extension-system";
import type { RouteObject } from "react-router";
import { AppLayout } from "../components/app-layout";
import { extensionConfig } from "../config/extensions";

/**
 * Extension-to-Plugin adapter that converts extension system components
 * into the existing plugin format
 */
export class ExtensionPluginAdapter {
  private registry: ExtensionRegistry;
  private plugins: Plugin[] = [];

  constructor() {
    this.registry = new ExtensionRegistry({
      extensionPaths: extensionConfig.extensions.map((ext) => ext.path),
      autoDiscover: extensionConfig.autoDiscovery,
      loadOnDemand: false,
      lazyLoad: false,
      enableSandbox: false,
      allowedPermissions: ["*"],
      devMode: extensionConfig.development?.enableDebugMode ?? false,
      hotReload: extensionConfig.development?.hotReload ?? false,
    });
  }

  /**
   * Initialize the extension system and load enabled extensions
   */
  async initialize(): Promise<void> {
    try {
      // Register enabled extensions
      for (const extensionDef of extensionConfig.extensions) {
        if (extensionDef.enabled) {
          // Create extension manifest
          const manifest = {
            id: extensionDef.name,
            name: extensionDef.name,
            version: "1.0.0",
            capabilities: {
              client: {
                components: ["DashboardWidget"],
                pages: ["DashboardPage", "AnalyticsPage"],
                routes: ["/dashboard", "/analytics"],
              },
              server: {
                routes: ["/api/dashboard/stats", "/api/dashboard/metrics"],
              },
            },
            main: "./dist/index.js",
            client: "./dist/client.js",
            server: "./dist/server.js",
          };

          // Create a mock loader for the extension
          const loader = async () => {
            // Return a mock extension instance
            return {
              activate: async () => {
                console.log(`Extension ${extensionDef.name} activated`);
              },
              deactivate: async () => {
                console.log(`Extension ${extensionDef.name} deactivated`);
              },
            };
          };

          await this.registry.registerExtension(manifest, loader);
        }
      }

      this.generatePlugins();
    } catch (error) {
      console.error("Failed to initialize extension system:", error);
    }
  }

  /**
   * Convert loaded extensions into plugins
   */
  private generatePlugins(): void {
    const extensions = this.registry.getAllExtensions();

    for (const extension of extensions) {
      const plugin: Plugin = {};

      // Convert extension routes to plugin routes
      if (extension.manifest.capabilities?.client?.routes) {
        plugin.routes = this.convertExtensionRoutes(extension);
      }

      // Add extension components
      if (extension.manifest.capabilities?.client?.components) {
        plugin.composer = [];
        plugin.tools = [];
        plugin.content = {};

        // For now, we'll add placeholder components
        if (extension.manifest.id === "example-dashboard") {
          plugin.content = {
            DashboardWidget: () => (
              <div className="p-4 border rounded-lg bg-background">
                <h3 className="text-lg font-semibold mb-2">Dashboard Widget</h3>
                <p className="text-muted-foreground">
                  Loaded from extension system
                </p>
              </div>
            ),
          };
        }
      }

      this.plugins.push(plugin);
    }
  }

  /**
   * Convert extension routes to React Router routes
   */
  private convertExtensionRoutes(extension: {
    manifest: { id: string };
  }): RouteObject[] {
    const routes: RouteObject[] = [];

    if (extension.manifest.id === "example-dashboard") {
      routes.push(
        {
          path: "/dashboard",
          Component: () => (
            <AppLayout>
              <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-6 border rounded-lg bg-card">
                    <h2 className="text-xl font-semibold mb-4">Stats Widget</h2>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Users:</span>
                        <span className="font-semibold">1,234</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Active Sessions:</span>
                        <span className="font-semibold">56</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenue:</span>
                        <span className="font-semibold">$12,345</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border rounded-lg bg-card">
                    <h2 className="text-xl font-semibold mb-4">Chart Widget</h2>
                    <div className="h-32 bg-muted rounded flex items-center justify-center">
                      <span className="text-muted-foreground">
                        Chart placeholder
                      </span>
                    </div>
                  </div>

                  <div className="p-6 border rounded-lg bg-card">
                    <h2 className="text-xl font-semibold mb-4">
                      Activity Widget
                    </h2>
                    <div className="space-y-2">
                      <div className="text-sm">Recent activity:</div>
                      <div className="text-xs text-muted-foreground">
                        User logged in
                      </div>
                      <div className="text-xs text-muted-foreground">
                        New order received
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Report generated
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AppLayout>
          ),
        },
        {
          path: "/analytics",
          Component: () => (
            <AppLayout>
              <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Analytics</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-6 border rounded-lg bg-card">
                    <h2 className="text-xl font-semibold mb-4">
                      Traffic Overview
                    </h2>
                    <div className="h-48 bg-muted rounded flex items-center justify-center">
                      <span className="text-muted-foreground">
                        Traffic chart placeholder
                      </span>
                    </div>
                  </div>

                  <div className="p-6 border rounded-lg bg-card">
                    <h2 className="text-xl font-semibold mb-4">
                      Performance Metrics
                    </h2>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Page Load Time:</span>
                        <span className="font-semibold text-green-600">
                          1.2s
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Bounce Rate:</span>
                        <span className="font-semibold text-orange-600">
                          35%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Conversion Rate:</span>
                        <span className="font-semibold text-blue-600">
                          3.2%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AppLayout>
          ),
        }
      );
    }

    return routes;
  }

  /**
   * Get all plugins generated from extensions
   */
  getPlugins(): Plugin[] {
    return this.plugins;
  }

  /**
   * Get the extension registry instance
   */
  getRegistry(): ExtensionRegistry {
    return this.registry;
  }
}

// Create singleton instance
export const extensionAdapter = new ExtensionPluginAdapter();
