import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany();
  }),
  getAllWithClaimAndShames: protectedProcedure.query(async ({ ctx }) => {
    const response = await ctx.prisma.user.findMany({
      include: {
        claim: {
          include: {
            hat: true,
          },
        },
        shames: true,
      },
    });

    return response
      .filter((user) => user.claim !== null)
      .sort((a, b) => {
        if (a.shames.length > b.shames.length) {
          return 1;
        }
        if (a.shames.length < b.shames.length) {
          return -1;
        }
        return 0;
      });
  }),
});
