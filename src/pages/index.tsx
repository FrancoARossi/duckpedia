import type { GetServerSidePropsContext, NextPage } from "next";
import type { Session } from "next-auth";
import { getSession, signIn } from "next-auth/react";
import Image, { type StaticImageData } from "next/image";
import { useRouter } from "next/router";
import googleLogo from "~/assets/btn_google_light_normal_ios.svg";
import duckGameBg from "~/assets/duck_game_bg_1.jpg";

const Home: NextPage = () => {
  const router = useRouter();

  const { error } = router.query;

  const getErrorMessage = () => {
    switch (error) {
      case "AccessDenied":
        return "You need a verified @sirius.com.ar email to sign in";
      default:
        return "An unknown error occurred.";
    }
  };

  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-b">
      <Image
        fill
        priority
        src={duckGameBg}
        className="object-cover"
        alt="Google logo"
      />
      <div className="absolute inset-0 bg-black/[35%]" />
      <div className="z-10 flex h-[80%] max-h-[600px] max-w-md animate-fade-in-from-top flex-col justify-center gap-8 overflow-hidden rounded-xl bg-white/50 px-4 py-20 shadow-2xl backdrop-blur-sm xs:w-[80%] md:w-full">
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col items-center gap-5">
            <h1 className="text-4xl font-semibold text-slate-900">
              Duckpedia 🦆
            </h1>
            <p className="text-center text-zinc-900 xs:text-lg md:text-xl">
              Your go-to source for{" "}
              <a
                target="_blank"
                href="https://store.steampowered.com/app/312530/Duck_Game"
                className="text-xl hover:underline"
              >
                Duck Game
              </a>
              <br />
              at{" "}
              <a
                target="_blank"
                href="https://www.sirius.com.ar"
                className="text-xl hover:underline"
              >
                Sirius
              </a>
              !
            </p>
            {!!error && (
              <span className="text-red-600">{getErrorMessage()}</span>
            )}
          </div>
          <div className="flex h-full items-center justify-center">
            <SignInButtons />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;

const SignInButtons: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="flex items-center gap-3 rounded-sm bg-white py-2 pl-2 pr-8 text-sm font-semibold uppercase text-black/[80%] no-underline transition hover:shadow-lg"
        onClick={() =>
          void signIn("google", {
            callbackUrl: `/claims`,
          })
        }
      >
        <Image
          priority
          src={googleLogo as StaticImageData}
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
