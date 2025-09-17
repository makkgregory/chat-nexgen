import cors from "@fastify/cors";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import Fastify from "fastify";
import { appRouter } from "./router";

const server = Fastify({
  routerOptions: {
    maxParamLength: 5000,
  },
});

void server.register(cors, {
  origin: true, // Allow all origins in development
});

void server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter },
});

const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
    const host = process.env.HOST || "localhost";

    await server.listen({ port, host });
    console.log(`🚀 tRPC API server ready at http://${host}:${port}/trpc`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
