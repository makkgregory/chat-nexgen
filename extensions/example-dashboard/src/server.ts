import type { ExtensionContext } from "@chat-ai/extension-system";

/**
 * Analytics middleware
 */
export const analyticsMiddleware = {
  id: "analytics",
  priority: 10,
  handler: async (req: any, res: any, next: any) => {
    // Log analytics data
    console.log(`Analytics: ${req.method} ${req.url}`);

    // Add analytics headers
    res.setHeader("X-Analytics-Tracked", "true");

    next();
  },
};

/**
 * Analytics service
 */
export const analyticsService = {
  id: "analytics",
  service: {
    getUserStats: async () => {
      return {
        totalUsers: 2543,
        activeUsers: 1876,
        growth: 12,
      };
    },

    getPerformanceMetrics: async () => {
      return {
        responseTime: 145,
        throughput: 98.5,
        errorRate: 0.02,
      };
    },
  },

  lifecycle: {
    start: async () => {
      console.log("Analytics service started");
    },

    stop: async () => {
      console.log("Analytics service stopped");
    },
  },
};

/**
 * Dashboard API routes
 */
export const dashboardRoutes = [
  {
    path: "/api/dashboard/stats",
    method: "GET" as const,
    handler: async (req: any, res: any) => {
      const { analyticsService } = req.extensionContext.registry.getService(
        "dashboard-example.analytics"
      );

      const stats = await analyticsService.getUserStats();
      res.json(stats);
    },
  },

  {
    path: "/api/dashboard/metrics",
    method: "GET" as const,
    handler: async (req: any, res: any) => {
      const { analyticsService } = req.extensionContext.registry.getService(
        "dashboard-example.analytics"
      );

      const metrics = await analyticsService.getPerformanceMetrics();
      res.json(metrics);
    },
  },
];

/**
 * Server-side extension export
 */
export default {
  routes: dashboardRoutes,

  middleware: {
    "analytics-middleware": analyticsMiddleware,
  },

  services: {
    "analytics-service": analyticsService,
  },

  // Extension lifecycle hooks
  async activate(context: ExtensionContext) {
    console.log("Dashboard server extension activated", context);

    // Initialize server-side services
    // Set up database connections, start background jobs, etc.
  },

  async deactivate(context: ExtensionContext) {
    console.log("Dashboard server extension deactivated", context);

    // Clean up server-side resources
  },
};
