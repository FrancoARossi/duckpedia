import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import { Poppins } from "next/font/google";
import MainLayout from "~/layouts/MainLayout";
import ModalProvider from "~/components/ModalProvider";

const poppins = Poppins({
  weight: ["200", "400", "500", "700"],
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>Duckpedia 🦆</title>
        <meta
          name="description"
          content="Your go to website for all Duck Game related stuff at Sirius Software"
        />
        <link rel="icon" href="/favicon.ico" />
        <style jsx global>{`
          html {
            font-family: ${poppins.style.fontFamily};
          }
        `}</style>
      </Head>
      <SessionProvider session={session}>
        <ModalProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ModalProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
