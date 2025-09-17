/**
 * Main extension entry point
 * This file exports both client and server capabilities
 */

export { default as client } from "./client";
export { default as server } from "./server";

// Re-export components for direct use
export * from "./components/dashboard-provider";
export * from "./components/widgets";
export * from "./pages";
