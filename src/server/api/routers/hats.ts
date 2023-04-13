//import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const hatsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.hat.findMany();
  }),
  getAllWithClaims: protectedProcedure.query(async ({ ctx }) => {
    const hatsWithClaims = await ctx.prisma.hat.findMany({
      include: { claim: true },
      orderBy: [
        {
          name: "asc",
        },
      ],
    });

    // Sort claimed hats to the bottom
    return hatsWithClaims.sort((a, b) => {
      if (a.claim && !b.claim) {
        return 1;
      }
      if (!a.claim && b.claim) {
        return -1;
      }
      return 0;
    });
  }),
});
