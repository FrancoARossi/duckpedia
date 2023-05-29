import type { NextPage, GetServerSidePropsContext } from "next";
import requireAuthentication from "~/utils/requireAuthentication";
import Card from "~/components/Card";
import { api } from "~/utils/api";
import SkeletonLoader from "~/components/SkeletonLoader";
import type { Claim, Hat, Shame, User } from "@prisma/client";
import HallOfShameCardContent from "./HallOfShameCardContent";
import { useSession } from "next-auth/react";

export type UserWithClaimHatAndShames = User & {
  claim: Claim & {
    hat: Hat;
  };
  shames: Shame[];
};

const HallOfShame: NextPage = () => {
  const { data: users, isLoading } =
    api.users.getAllWithClaimAndShames.useQuery();
  const { data: session } = useSession();

  return (
    <main className="flex w-full max-w-8xl animate-fade-in-from-top flex-col items-center gap-8 xs:h-[90%] md:h-[80%]">
      <div className="grid w-full grid-cols-[100px_2fr_1fr_100px] px-6">
        <div className="flex w-full justify-start">
          <span className="font-semibold text-slate-800">Place</span>
        </div>
        <div className="flex w-full justify-start">
          <span className="font-semibold text-slate-800">Hat</span>
        </div>
        <div className="flex w-full justify-start">
          <span className="font-semibold text-slate-800">User</span>
        </div>
        <div className="flex w-full justify-center">
          <span className="font-semibold text-slate-800">Shame</span>
        </div>
      </div>
      {isLoading &&
        [...Array(5).keys()].map((i) => (
          <div key={`skeleton_shame_${i}`} className="w-full">
            <SkeletonLoader className="h-24 w-full rounded" />
          </div>
        ))}
      {!!users?.length &&
        users.map((user, index) => (
          <Card
            key={user.id}
            className="w-full"
            content={
              <HallOfShameCardContent
                user={user as UserWithClaimHatAndShames}
                place={index + 1}
                disableShameButton={session?.user?.id === user.id}
              />
            }
          />
        ))}
    </main>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return requireAuthentication(context, ({ session }) => {
    return {
      props: {
        session,
      },
    };
  });
};

export default HallOfShame;
