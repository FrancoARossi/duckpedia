import { z } from "zod";

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
  claimHat: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: hatId }) => {
      const { id: userId } = ctx.session.user;

      const hat = await ctx.prisma.hat.findUnique({
        where: { id: hatId },
        include: { claim: true },
      });

      if (!hat) {
        throw new Error("Hat not found");
      }

      if (hat.claim) {
        throw new Error("Hat already claimed");
      }

      const userWithClaim = await ctx.prisma.user.findUnique({
        where: { id: userId },
        include: { claim: true },
      });

      if (!userWithClaim) {
        throw new Error("User not found");
      }

      if (userWithClaim.claim) {
        await ctx.prisma.claim.deleteMany({
          where: {
            claimedById: userId,
          },
        });
      }

      const claim = await ctx.prisma.claim.create({
        data: {
          claimedBy: {
            connect: {
              id: userId,
            },
          },
          hat: {
            connect: {
              id: hatId,
            },
          },
        },
      });

      return claim;
    }),
});
