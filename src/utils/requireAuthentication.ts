import { getSession } from "next-auth/react";
import { type Session } from "next-auth";
import { type GetServerSidePropsContext } from "next";

type AuthenticationCallback = {
  ({ session }: { session: Session }): {
    props: { session: Session };
  };
};

const requireAuthentication = async (
  context: GetServerSidePropsContext,
  callback: AuthenticationCallback
) => {
  const session: Session | null = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return callback({ session });
};

export default requireAuthentication;
