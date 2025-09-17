import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { type ReactNode } from "react";
import { trpc } from "./client";
import {
  createQueryClient,
  createTRPCClientLinks,
  type TRPCClientConfig,
} from "./config";

interface TRPCProviderProps {
  children: ReactNode;
  config?: TRPCClientConfig;
  queryClient?: QueryClient;
}

/**
 * tRPC Provider component that sets up tRPC and React Query
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <TRPCProvider config={{ url: 'http://localhost:3001/trpc' }}>
 *       <MyApp />
 *     </TRPCProvider>
 *   );
 * }
 * ```
 */
export function TRPCProvider({
  children,
  config = {},
  queryClient,
}: TRPCProviderProps) {
  const [client] = React.useState(() =>
    trpc.createClient({
      links: createTRPCClientLinks(config),
    })
  );

  const [reactQueryClient] = React.useState(
    () => queryClient ?? createQueryClient()
  );

  return (
    <trpc.Provider client={client} queryClient={reactQueryClient}>
      <QueryClientProvider client={reactQueryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
