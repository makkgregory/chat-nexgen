import { Button } from "@chat-ai/ui";
import { useDashboard } from "../components/dashboard-provider";
import { DashboardWidget } from "../components/widgets";

/**
 * Main dashboard page
 */
export function DashboardPage() {
  const { refreshData, isLoading } = useDashboard();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your dashboard overview
          </p>
        </div>
        <Button onClick={refreshData} disabled={isLoading}>
          {isLoading ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      <DashboardWidget />
    </div>
  );
}

/**
 * Analytics page
 */
export function AnalyticsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Detailed analytics and reporting
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">User Engagement</h2>
          <div className="h-[300px] flex items-center justify-center bg-muted rounded">
            <div className="text-muted-foreground">
              Engagement chart placeholder
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
          <div className="h-[300px] flex items-center justify-center bg-muted rounded">
            <div className="text-muted-foreground">
              Performance chart placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
