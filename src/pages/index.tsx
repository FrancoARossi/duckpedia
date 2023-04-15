import type { GetServerSidePropsContext, NextPage } from "next";
import type { Session } from "next-auth";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import googleLogo from "~/assets/btn_google_light_normal_ios.svg";

const Home: NextPage = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="flex h-[60%] w-[70%] max-w-xl animate-fade-in flex-col justify-center gap-8 overflow-hidden rounded-xl bg-white/50 px-4 py-8 drop-shadow">
        <div className="flex h-full flex-col justify-around">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl font-extralight">Duckpedia 🦆</h1>
            <p className="text-lg text-zinc-700">
              Your go-to source for{" "}
              <a
                target="_blank"
                href="https://store.steampowered.com/app/312530/Duck_Game"
              >
                Duck Game
              </a>{" "}
              at{" "}
              <a target="_blank" href="https://www.sirius.com.ar">
                Sirius!
              </a>
            </p>
          </div>
          <AuthShowcase />
        </div>
      </div>
    </main>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="flex items-center rounded-sm gap-3 bg-white px-2 py-2 text-sm font-semibold uppercase text-black/[54%] no-underline transition hover:shadow-lg"
        onClick={() =>
          void signIn("google", {
            callbackUrl: `/claims`,
          })
        }
      >
        <Image
          priority
          src={googleLogo}
          height={32}
          width={32}
          alt="Google logo"
        />
        Sign in with Google
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
