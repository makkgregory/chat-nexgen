import { createContext, useContext, useState, type ReactNode } from "react";

/**
 * Dashboard context for managing dashboard state
 */
interface DashboardContextValue {
  widgets: string[];
  addWidget: (widgetId: string) => void;
  removeWidget: (widgetId: string) => void;
  refreshData: () => void;
  isLoading: boolean;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

/**
 * Dashboard provider component
 */
export function DashboardProvider({ children }: { children: ReactNode }) {
  const [widgets, setWidgets] = useState<string[]>([
    "stats-card",
    "chart-widget",
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const addWidget = (widgetId: string) => {
    setWidgets((prev) => [...prev, widgetId]);
  };

  const removeWidget = (widgetId: string) => {
    setWidgets((prev) => prev.filter((id) => id !== widgetId));
  };

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const value: DashboardContextValue = {
    widgets,
    addWidget,
    removeWidget,
    refreshData,
    isLoading,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

/**
 * Hook to use dashboard context
 */
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
