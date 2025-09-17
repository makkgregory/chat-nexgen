import { ExtensionRegistry } from "../core/registry";
import type { Extension } from "../core/types";

/**
 * Server-side extension point interfaces
 */
export interface RouteExtension {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
  handler: (req: any, res: any, next?: any) => Promise<any> | any;
  middleware?: any[];
  schema?: {
    body?: any;
    query?: any;
    params?: any;
    headers?: any;
    response?: any;
  };
}

export interface MiddlewareExtension {
  id: string;
  handler: (req: any, res: any, next: any) => Promise<void> | void;
  priority?: number;
  condition?: (req: any) => boolean;
}

export interface ServiceExtension {
  id: string;
  service: any;
  dependencies?: string[];
  lifecycle?: {
    start?: () => Promise<void> | void;
    stop?: () => Promise<void> | void;
  };
}

export interface JobExtension {
  id: string;
  schedule?: string; // cron expression
  handler: () => Promise<void> | void;
  immediate?: boolean;
}

export interface EventExtension {
  event: string;
  handler: (...args: any[]) => Promise<void> | void;
  priority?: number;
}

/**
 * Server extension registry for managing server-side extensions
 */
export class ServerExtensionRegistry extends ExtensionRegistry {
  private routes = new Map<string, RouteExtension[]>();
  private middleware = new Map<string, MiddlewareExtension[]>();
  private services = new Map<string, ServiceExtension>();
  private jobs = new Map<string, JobExtension>();
  private eventHandlers = new Map<string, EventExtension[]>();
  private isInitialized = false;

  constructor(config: any = {}) {
    super({
      devMode: process.env.NODE_ENV === "development",
      ...config,
    });
  }

  /**
   * Initialize the server extension registry
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Load all registered extensions
    const extensions = this.getAllExtensions();

    for (const extension of extensions) {
      if (extension.instance) {
        await this.registerServerCapabilities(extension);
      }
    }

    this.isInitialized = true;
  }

  /**
   * Register server capabilities from an extension
   */
  private async registerServerCapabilities(
    extension: Extension
  ): Promise<void> {
    const instance = extension.instance;
    if (!instance) return;

    // Register routes
    if (instance.routes) {
      await this.registerRoutes(extension.manifest.id, instance.routes);
    }

    // Register middleware
    if (instance.middleware) {
      await this.registerMiddleware(extension.manifest.id, instance.middleware);
    }

    // Register services
    if (instance.services) {
      await this.registerServices(extension.manifest.id, instance.services);
    }

    // Register jobs
    if (instance.jobs) {
      await this.registerJobs(extension.manifest.id, instance.jobs);
    }

    // Register event handlers
    if (instance.events) {
      await this.registerEventHandlers(extension.manifest.id, instance.events);
    }
  }

  /**
   * Register routes from an extension
   */
  async registerRoutes(
    extensionId: string,
    routes: RouteExtension[]
  ): Promise<void> {
    for (const route of routes) {
      const routeKey = `${route.method}:${route.path}`;

      if (!this.routes.has(routeKey)) {
        this.routes.set(routeKey, []);
      }

      this.routes.get(routeKey)!.push({
        ...route,
        handler: this.wrapRouteHandler(extensionId, route.handler),
      });
    }
  }

  /**
   * Register middleware from an extension
   */
  async registerMiddleware(
    extensionId: string,
    middleware: MiddlewareExtension[]
  ): Promise<void> {
    for (const mw of middleware) {
      const key = mw.id || extensionId;

      if (!this.middleware.has(key)) {
        this.middleware.set(key, []);
      }

      this.middleware.get(key)!.push({
        ...mw,
        handler: this.wrapMiddlewareHandler(extensionId, mw.handler),
      });
    }
  }

  /**
   * Register services from an extension
   */
  async registerServices(
    extensionId: string,
    services: Record<string, ServiceExtension>
  ): Promise<void> {
    for (const [serviceId, service] of Object.entries(services)) {
      const fullServiceId = `${extensionId}.${serviceId}`;
      this.services.set(fullServiceId, service);

      // Start service if it has a start method
      if (service.lifecycle?.start) {
        await service.lifecycle.start();
      }
    }
  }

  /**
   * Register jobs from an extension
   */
  async registerJobs(
    extensionId: string,
    jobs: Record<string, JobExtension>
  ): Promise<void> {
    for (const [jobId, job] of Object.entries(jobs)) {
      const fullJobId = `${extensionId}.${jobId}`;
      this.jobs.set(fullJobId, {
        ...job,
        handler: this.wrapJobHandler(extensionId, job.handler),
      });
    }
  }

  /**
   * Register event handlers from an extension
   */
  async registerEventHandlers(
    extensionId: string,
    events: Record<string, EventExtension>
  ): Promise<void> {
    for (const [eventName, eventHandler] of Object.entries(events)) {
      if (!this.eventHandlers.has(eventName)) {
        this.eventHandlers.set(eventName, []);
      }

      this.eventHandlers.get(eventName)!.push({
        ...eventHandler,
        handler: this.wrapEventHandler(extensionId, eventHandler.handler),
      });
    }
  }

  /**
   * Get all registered routes
   */
  getRoutes(): Map<string, RouteExtension[]> {
    return this.routes;
  }

  /**
   * Get middleware for a specific key
   */
  getMiddleware(key?: string): MiddlewareExtension[] {
    if (key) {
      return this.middleware.get(key) || [];
    }

    // Return all middleware sorted by priority
    const allMiddleware: MiddlewareExtension[] = [];
    for (const middlewareList of this.middleware.values()) {
      allMiddleware.push(...middlewareList);
    }

    return allMiddleware.sort((a, b) => (a.priority || 0) - (b.priority || 0));
  }

  /**
   * Get a service by ID
   */
  getService(serviceId: string): ServiceExtension | undefined {
    return this.services.get(serviceId);
  }

  /**
   * Get all services
   */
  getAllServices(): Map<string, ServiceExtension> {
    return this.services;
  }

  /**
   * Get all jobs
   */
  getJobs(): Map<string, JobExtension> {
    return this.jobs;
  }

  /**
   * Get event handlers for an event
   */
  getEventHandlers(eventName: string): EventExtension[] {
    const handlers = this.eventHandlers.get(eventName) || [];
    return handlers.sort((a, b) => (a.priority || 0) - (b.priority || 0));
  }

  /**
   * Emit an event to all registered handlers
   */
  async emitEvent(eventName: string, ...args: any[]): Promise<void> {
    const handlers = this.getEventHandlers(eventName);

    await Promise.all(handlers.map((handler) => handler.handler(...args)));
  }

  /**
   * Wrap route handler with extension context
   */
  private wrapRouteHandler(extensionId: string, handler: any) {
    return async (req: any, res: any, next?: any) => {
      try {
        const extension = this.getExtension(extensionId);
        if (!extension) {
          throw new Error(`Extension ${extensionId} not found`);
        }

        // Add extension context to request
        req.extensionContext = {
          extension,
          registry: this,
        };

        return await handler(req, res, next);
      } catch (error) {
        console.error(
          `Error in route handler for extension ${extensionId}:`,
          error
        );
        if (next) next(error);
        else throw error;
      }
    };
  }

  /**
   * Wrap middleware handler with extension context
   */
  private wrapMiddlewareHandler(extensionId: string, handler: any) {
    return async (req: any, res: any, next: any) => {
      try {
        const extension = this.getExtension(extensionId);
        if (!extension) {
          return next();
        }

        // Add extension context to request
        req.extensionContext = {
          extension,
          registry: this,
        };

        await handler(req, res, next);
      } catch (error) {
        console.error(
          `Error in middleware for extension ${extensionId}:`,
          error
        );
        next(error);
      }
    };
  }

  /**
   * Wrap job handler with extension context
   */
  private wrapJobHandler(extensionId: string, handler: any) {
    return async () => {
      try {
        const extension = this.getExtension(extensionId);
        if (!extension) {
          throw new Error(`Extension ${extensionId} not found`);
        }

        await handler();
      } catch (error) {
        console.error(
          `Error in job handler for extension ${extensionId}:`,
          error
        );
        throw error;
      }
    };
  }

  /**
   * Wrap event handler with extension context
   */
  private wrapEventHandler(extensionId: string, handler: any) {
    return async (...args: any[]) => {
      try {
        const extension = this.getExtension(extensionId);
        if (!extension) {
          return;
        }

        await handler(...args);
      } catch (error) {
        console.error(
          `Error in event handler for extension ${extensionId}:`,
          error
        );
      }
    };
  }

  /**
   * Shutdown all services
   */
  async shutdown(): Promise<void> {
    const shutdownPromises: Promise<void>[] = [];

    for (const service of this.services.values()) {
      if (service.lifecycle?.stop) {
        const result = service.lifecycle.stop();
        if (result instanceof Promise) {
          shutdownPromises.push(result);
        }
      }
    }

    await Promise.all(shutdownPromises);
  }
}

/**
 * Default server extension registry instance
 */
export const defaultServerExtensionRegistry = new ServerExtensionRegistry();
