import { healthRouter } from "./routers/health";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

export const appRouter = router({
  user: userRouter,
  health: healthRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
