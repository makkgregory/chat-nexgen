import { QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";

/**
 * Default configuration for the tRPC client
 */
export interface TRPCClientConfig {
  /**
   * The URL of the tRPC API server
   * @default 'http://localhost:3001/trpc'
   */
  url?: string;

  /**
   * Headers to include with every request
   */
  headers?: Record<string, string>;

  /**
   * Custom fetch function
   */
  fetch?: typeof fetch;
}

/**
 * Create tRPC client links configuration
 */
export function createTRPCClientLinks(config: TRPCClientConfig = {}) {
  const {
    url = "http://localhost:3001/trpc",
    headers = {},
    fetch: customFetch,
  } = config;

  return [
    httpBatchLink({
      url,
      headers,
      fetch: customFetch,
    }),
  ];
}

/**
 * Create a new QueryClient with sensible defaults for tRPC
 */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: (failureCount, error: any) => {
          // Don't retry on 4xx errors
          if (error?.status >= 400 && error?.status < 500) {
            return false;
          }
          return failureCount < 3;
        },
      },
    },
  });
}
