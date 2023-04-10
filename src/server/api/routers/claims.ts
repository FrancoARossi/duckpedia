//import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const claimsRouter = createTRPCRouter({
  /* hello: protectedProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }), */

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.claim.findMany({
      include: {
        claimedBy: true,
        hat: true,
      },
    });
  }),
});
