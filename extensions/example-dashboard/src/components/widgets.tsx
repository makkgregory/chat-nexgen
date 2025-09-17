import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@chat-ai/ui";
import { useDashboard } from "./dashboard-provider";

/**
 * Main dashboard widget component
 */
export function DashboardWidget() {
  const { widgets, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">Loading dashboard...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {widgets.map((widgetId) => (
        <div key={widgetId}>
          {widgetId === "stats-card" && <StatsCard />}
          {widgetId === "chart-widget" && <ChartWidget />}
        </div>
      ))}
    </div>
  );
}

/**
 * Statistics card widget
 */
export function StatsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Users</CardTitle>
        <CardDescription>Active users this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">2,543</div>
        <p className="text-xs text-muted-foreground">+12% from last month</p>
      </CardContent>
    </Card>
  );
}

/**
 * Chart widget component
 */
export function ChartWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
        <CardDescription>Performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex items-center justify-center bg-muted rounded">
          <div className="text-muted-foreground">Chart placeholder</div>
        </div>
      </CardContent>
    </Card>
  );
}
