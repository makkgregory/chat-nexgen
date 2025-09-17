import type { ExtensionContext } from "@chat-ai/extension-system";
import { DashboardProvider } from "./components/dashboard-provider";
import { ChartWidget, DashboardWidget, StatsCard } from "./components/widgets";
import { AnalyticsPage, DashboardPage } from "./pages";
import { dashboardRoutes } from "./routes";

/**
 * Client-side extension export
 */
export default {
  // React components that can be used as extension points
  components: {
    "dashboard-widget": DashboardWidget,
    "stats-card": StatsCard,
    "chart-widget": ChartWidget,
  },

  // Pages that can be rendered
  pages: {
    "dashboard-page": {
      path: "/dashboard",
      component: DashboardPage,
      meta: {
        title: "Dashboard",
        description: "Main dashboard with widgets and analytics",
      },
    },
    "analytics-page": {
      path: "/analytics",
      component: AnalyticsPage,
      meta: {
        title: "Analytics",
        description: "Detailed analytics and reporting",
      },
    },
  },

  // Routes for React Router
  routes: dashboardRoutes,

  // React providers
  providers: {
    "dashboard-provider": {
      component: DashboardProvider,
      priority: 10,
    },
  },

  // Extension lifecycle hooks
  async activate(context: ExtensionContext) {
    console.log("Dashboard extension activated", context);

    // Initialize client-side services
    // Register event handlers, set up subscriptions, etc.
  },

  async deactivate(context: ExtensionContext) {
    console.log("Dashboard extension deactivated", context);

    // Clean up client-side resources
  },
};
