//import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const hatsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.hat.findMany({
      include: { claim: true },
      orderBy: [
        {
          name: "asc",
        },
      ],
    });
  }),
});
