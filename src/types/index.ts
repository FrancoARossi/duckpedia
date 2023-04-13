import type { Claim, Hat, Prisma, User } from "@prisma/client";

export type ClaimedHat = Prisma.HatGetPayload<{
  include: { claim: true };
}>;

export type ClaimWithHatAndUser = Claim & {
  hat: Hat;
  claimedBy: User | null;
  hatId: string | null;
  claimedById: string | null;
};
