import type { GetServerSidePropsContext, NextPage } from "next";
import type { Session } from "next-auth";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="flex h-[80%] w-[70%] max-w-xl animate-fade-in flex-col justify-center gap-8 overflow-hidden rounded-xl bg-white px-4 py-8 drop-shadow">
        <AuthShowcase />
      </div>
    </main>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-black">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-gray-200 px-10 py-3 font-semibold text-black no-underline transition hover:bg-gray-300"
        onClick={
          sessionData
            ? () => void signOut()
            : () =>
                void signIn("google", {
                  callbackUrl: `/claims`,
                })
        }
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session: Session | null = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/claims",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
