import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const healthRouter = router({
  check: publicProcedure.query(() => {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }),

  echo: publicProcedure
    .input(z.object({ message: z.string() }))
    .query(({ input }) => {
      return {
        echo: input.message,
        timestamp: new Date().toISOString(),
      };
    }),
});
