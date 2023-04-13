import type { Prisma } from "@prisma/client";

export type ClaimedHat = Prisma.HatGetPayload<{
  include: { claim: true };
}>;
