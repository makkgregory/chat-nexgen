import type { ReactNode } from "react";
import { AppNavigation } from "./app-navigation";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />
      <main className="container mx-auto">
        {children}
      </main>
    </div>
  );
}