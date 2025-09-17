/**
 * @chat-ai/trpc - tRPC client with React Query integration
 *
 * This package provides a fully configured tRPC client with TanStack React Query
 * integration for the chat-ai application.
 */

// Core tRPC client
export { trpc as api } from "./client";
export type { AppRouter } from "./client";

// Configuration utilities
export {
  createQueryClient,
  createTRPCClientLinks,
  type TRPCClientConfig,
} from "./config";

// React provider
export { TRPCProvider } from "./provider";
