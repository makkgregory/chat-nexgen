import type { RouteObject } from "react-router";
import { AnalyticsPage, DashboardPage } from "../pages";

/**
 * Dashboard routes for React Router
 */
export const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/analytics",
    element: <AnalyticsPage />,
  },
];
