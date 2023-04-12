import { createTRPCRouter } from "~/server/api/trpc";
import { claimsRouter } from "~/server/api/routers/claims";
import { hatsRouter } from "~/server/api/routers/hats";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  claims: claimsRouter,
  hats: hatsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
