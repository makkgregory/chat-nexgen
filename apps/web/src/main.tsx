import { TRPCProvider } from "@chat-ai/trpc";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import plugins, { initializePlugins } from "./plugins";

// Initialize with default plugins first
let router = createBrowserRouter(plugins.routes);

// Async function to load extensions and recreate router
async function loadExtensions() {
  try {
    const extendedPlugins = await initializePlugins();
    router = createBrowserRouter(extendedPlugins.routes);
    
    // Re-render with updated router
    root.render(
      <StrictMode>
        <TRPCProvider>
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading extensions...</div>}>
            <RouterProvider router={router} />
          </Suspense>
        </TRPCProvider>
      </StrictMode>
    );
  } catch (error) {
    console.error("Failed to load extensions:", error);
    // Continue with default plugins
  }
}

const root = createRoot(document.getElementById("root")!);

// Initial render with default plugins
root.render(
  <StrictMode>
    <TRPCProvider>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </TRPCProvider>
  </StrictMode>
);

// Load extensions in the background
loadExtensions();
