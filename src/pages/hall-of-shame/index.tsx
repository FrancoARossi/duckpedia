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
      <div className="flex w-full rounded-md bg-slate-50 xs:px-4 xs:py-2 md:px-8 md:py-4">
        <h1 className="font-extralight xs:text-xl xs:font-bold md:text-3xl">
          Hall of Shame 💀
        </h1>
      </div>
      <section className="flex h-full w-full flex-wrap gap-x-4 gap-y-3 overflow-auto p-2 xs:justify-center sm:justify-normal">
        {isLoading &&
          [...Array(5).keys()].map((i) => (
            <SkeletonLoader
              key={`skeleton_shame_${i}`}
              className="rounded-md"
            />
          ))}
        {!!users &&
          users.map((user, index) => (
            <Card
              key={user.id}
              className="relative flex h-80 cursor-pointer flex-col items-center justify-center md:max-w-[220px]"
              content={
                <HallOfShameCardContent
                  user={user as UserWithClaimHatAndShames}
                  place={index + 1}
                  disableShameButton={session?.user?.id === user.id}
                />
              }
            />
          ))}
      </section>
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
