import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const shamesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.shame.findMany();
  }),
  getAllByUserId: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId }: { userId: string } = input;

      if (!userId) throw new Error("userId is required");

      return await ctx.prisma.shame.findMany({
        where: {
          userId,
        },
        include: {
          shamedBy: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    }),
  createShame: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        note: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, note } = input;
      const { id: shamedById } = ctx.session.user;

      return await ctx.prisma.shame.create({
        data: {
          shamedBy: {
            connect: {
              id: shamedById,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
          note,
        },
      });
    }),
});
