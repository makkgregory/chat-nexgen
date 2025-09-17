import { router } from './trpc';
import { userRouter } from './routers/user';
import { healthRouter } from './routers/health';

export const appRouter = router({
  user: userRouter,
  health: healthRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;