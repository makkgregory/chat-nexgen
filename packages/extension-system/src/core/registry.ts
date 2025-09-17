import { EventEmitter } from "eventemitter3";
import type {
  Extension,
  ExtensionContext,
  ExtensionManifest,
  ExtensionPoint,
  ExtensionRegistryConfig,
} from "./types";
import { ExtensionManifestSchema, ExtensionStatus } from "./types";

/**
 * Extension registry events
 */
interface ExtensionRegistryEvents {
  "extension:registered": (extension: Extension) => void;
  "extension:loaded": (extension: Extension) => void;
  "extension:activated": (extension: Extension) => void;
  "extension:deactivated": (extension: Extension) => void;
  "extension:unregistered": (extension: Extension) => void;
  "extension:error": (extension: Extension, error: Error) => void;
  "extensionPoint:registered": (point: ExtensionPoint) => void;
  "extensionPoint:unregistered": (point: ExtensionPoint) => void;
}

/**
 * Core extension registry that manages extension lifecycle
 */
export class ExtensionRegistry extends EventEmitter<ExtensionRegistryEvents> {
  private extensions = new Map<string, Extension>();
  private extensionPoints = new Map<string, ExtensionPoint>();
  private config: ExtensionRegistryConfig;
  private loadPromises = new Map<string, Promise<Extension>>();

  constructor(config: Partial<ExtensionRegistryConfig> = {}) {
    super();

    this.config = {
      extensionPaths: [],
      autoDiscover: true,
      loadOnDemand: false,
      lazyLoad: true,
      enableSandbox: false,
      allowedPermissions: [],
      devMode: false,
      hotReload: false,
      ...config,
    };
  }

  /**
   * Register an extension with the registry
   */
  async registerExtension(
    manifest: ExtensionManifest,
    loader?: () => Promise<any>
  ): Promise<Extension> {
    // Validate manifest
    const validatedManifest = ExtensionManifestSchema.parse(manifest);

    // Check if extension already exists
    if (this.extensions.has(validatedManifest.id)) {
      throw new Error(
        `Extension with ID '${validatedManifest.id}' is already registered`
      );
    }

    const extension: Extension = {
      manifest: validatedManifest,
      status: ExtensionStatus.INACTIVE,
      config: {},
    };

    this.extensions.set(validatedManifest.id, extension);
    this.emit("extension:registered", extension);

    // Auto-load if configured
    if (!this.config.loadOnDemand && loader) {
      await this.loadExtension(validatedManifest.id, loader);
    }

    return extension;
  }

  /**
   * Load an extension
   */
  async loadExtension(
    extensionId: string,
    loader?: () => Promise<any>
  ): Promise<Extension> {
    const extension = this.extensions.get(extensionId);
    if (!extension) {
      throw new Error(`Extension '${extensionId}' not found`);
    }

    // Return existing load promise if already loading
    const existingPromise = this.loadPromises.get(extensionId);
    if (existingPromise) {
      return existingPromise;
    }

    // Create load promise
    const loadPromise = this._doLoadExtension(extension, loader);
    this.loadPromises.set(extensionId, loadPromise);

    try {
      const result = await loadPromise;
      this.loadPromises.delete(extensionId);
      return result;
    } catch (error) {
      this.loadPromises.delete(extensionId);
      throw error;
    }
  }

  /**
   * Internal extension loading logic
   */
  private async _doLoadExtension(
    extension: Extension,
    loader?: () => Promise<any>
  ): Promise<Extension> {
    try {
      extension.status = ExtensionStatus.LOADING;

      if (!loader) {
        throw new Error(
          `No loader provided for extension '${extension.manifest.id}'`
        );
      }

      // Load the extension module
      const instance = await loader();

      extension.instance = instance;
      extension.loadedAt = new Date();
      extension.status = ExtensionStatus.ACTIVE;

      this.emit("extension:loaded", extension);

      // Auto-activate if the extension provides an activate function
      if (instance.activate && typeof instance.activate === "function") {
        await this.activateExtension(extension.manifest.id);
      }

      return extension;
    } catch (error) {
      extension.status = ExtensionStatus.ERROR;
      extension.error = error as Error;
      this.emit("extension:error", extension, error as Error);
      throw error;
    }
  }

  /**
   * Activate an extension
   */
  async activateExtension(extensionId: string): Promise<void> {
    const extension = this.extensions.get(extensionId);
    if (!extension) {
      throw new Error(`Extension '${extensionId}' not found`);
    }

    if (extension.status !== ExtensionStatus.ACTIVE) {
      throw new Error(
        `Extension '${extensionId}' must be loaded before activation`
      );
    }

    if (extension.instance?.activate) {
      const context: ExtensionContext = {
        extension,
        registry: this,
        config: extension.config || {},
        logger: this.createLogger(extensionId),
      };

      await extension.instance.activate(context);
      extension.activatedAt = new Date();
      this.emit("extension:activated", extension);
    }
  }

  /**
   * Deactivate an extension
   */
  async deactivateExtension(extensionId: string): Promise<void> {
    const extension = this.extensions.get(extensionId);
    if (!extension) {
      throw new Error(`Extension '${extensionId}' not found`);
    }

    if (extension.instance?.deactivate) {
      const context: ExtensionContext = {
        extension,
        registry: this,
        config: extension.config || {},
        logger: this.createLogger(extensionId),
      };

      await extension.instance.deactivate(context);
      this.emit("extension:deactivated", extension);
    }
  }

  /**
   * Unregister an extension
   */
  async unregisterExtension(extensionId: string): Promise<void> {
    const extension = this.extensions.get(extensionId);
    if (!extension) {
      return;
    }

    // Deactivate first if active
    if (extension.status === ExtensionStatus.ACTIVE) {
      await this.deactivateExtension(extensionId);
    }

    this.extensions.delete(extensionId);
    this.emit("extension:unregistered", extension);
  }

  /**
   * Get an extension by ID
   */
  getExtension(extensionId: string): Extension | undefined {
    return this.extensions.get(extensionId);
  }

  /**
   * Get all extensions
   */
  getAllExtensions(): Extension[] {
    return Array.from(this.extensions.values());
  }

  /**
   * Get extensions by status
   */
  getExtensionsByStatus(status: ExtensionStatus): Extension[] {
    return this.getAllExtensions().filter((ext) => ext.status === status);
  }

  /**
   * Register an extension point
   */
  registerExtensionPoint(point: ExtensionPoint): void {
    if (this.extensionPoints.has(point.id)) {
      throw new Error(`Extension point '${point.id}' already exists`);
    }

    this.extensionPoints.set(point.id, point);
    this.emit("extensionPoint:registered", point);
  }

  /**
   * Unregister an extension point
   */
  unregisterExtensionPoint(pointId: string): void {
    const point = this.extensionPoints.get(pointId);
    if (point) {
      this.extensionPoints.delete(pointId);
      this.emit("extensionPoint:unregistered", point);
    }
  }

  /**
   * Get an extension point by ID
   */
  getExtensionPoint(pointId: string): ExtensionPoint | undefined {
    return this.extensionPoints.get(pointId);
  }

  /**
   * Get all extension points
   */
  getAllExtensionPoints(): ExtensionPoint[] {
    return Array.from(this.extensionPoints.values());
  }

  /**
   * Get extensions that provide a specific extension point
   */
  getExtensionsForPoint(pointId: string): Extension[] {
    return this.getAllExtensions().filter((ext) =>
      ext.manifest.extensionPoints?.some((ep) => ep.id === pointId)
    );
  }

  /**
   * Update extension configuration
   */
  updateExtensionConfig(
    extensionId: string,
    config: Record<string, any>
  ): void {
    const extension = this.extensions.get(extensionId);
    if (extension) {
      extension.config = { ...extension.config, ...config };
    }
  }

  /**
   * Create a logger for an extension
   */
  private createLogger(extensionId: string) {
    const prefix = `[${extensionId}]`;

    return {
      debug: (message: string, ...args: any[]) => {
        if (this.config.devMode) {
          console.debug(prefix, message, ...args);
        }
      },
      info: (message: string, ...args: any[]) => {
        console.info(prefix, message, ...args);
      },
      warn: (message: string, ...args: any[]) => {
        console.warn(prefix, message, ...args);
      },
      error: (message: string, ...args: any[]) => {
        console.error(prefix, message, ...args);
      },
    };
  }
}

/**
 * Default extension registry instance
 */
export const defaultExtensionRegistry = new ExtensionRegistry();
