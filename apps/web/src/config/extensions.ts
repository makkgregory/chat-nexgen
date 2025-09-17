interface ExtensionDefinition {
  name: string;
  enabled: boolean;
  path: string;
  config?: Record<string, unknown>;
}

interface ExtensionConfig {
  extensions: ExtensionDefinition[];
  autoDiscovery: boolean;
  development?: {
    hotReload: boolean;
    enableDebugMode: boolean;
  };
}

export const extensionConfig: ExtensionConfig = {
  extensions: [
    {
      name: "example-dashboard",
      enabled: true,
      path: "../../extensions/example-dashboard",
    },
  ],
  autoDiscovery: true,
  development: {
    hotReload: true,
    enableDebugMode: true,
  },
};
