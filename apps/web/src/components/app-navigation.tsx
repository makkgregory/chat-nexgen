import { Button } from "@chat-ai/ui";
import { Link, useLocation } from "react-router";

export function AppNavigation() {
  const location = useLocation();

  const navigationItems = [
    { path: "/", label: "Chat" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/analytics", label: "Analytics" },
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center space-x-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-semibold">Chat AI</h1>
          </div>

          <div className="flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "default" : "ghost"}
                size="sm"
                asChild
              >
                <Link to={item.path}>{item.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
