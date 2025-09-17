import type { AppRouter } from "@chat-ai/api/src/router";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>() as ReturnType<
  typeof createTRPCReact<AppRouter>
>;

export type { AppRouter };
