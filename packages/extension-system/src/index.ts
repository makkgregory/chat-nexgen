/**
 * @chat-ai/extension-system
 *
 * A comprehensive extension system for building modular applications
 * with support for client-side and server-side extension points.
 */

// Core extension system
export * from "./core/registry";
export * from "./core/types";

// Re-export client and server modules for convenience
export * as Client from "./client";
export * as Server from "./server";
