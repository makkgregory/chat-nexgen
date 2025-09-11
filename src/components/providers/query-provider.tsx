import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type FC, type PropsWithChildren } from "react";

interface QueryProviderProps extends PropsWithChildren {}

export const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
