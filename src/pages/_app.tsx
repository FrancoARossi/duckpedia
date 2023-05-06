import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import { Poppins } from "next/font/google";
import MainLayout from "~/layouts/MainLayout";
import ModalProvider from "~/components/ModalProvider";
import NavBar from "~/components/NavBar";
import useMediaQuery from "~/hooks/useMediaQuery";
import MobileNavBar, { MobileNavMenu } from "~/components/MobileNavBar";
import { useState } from "react";

const poppins = Poppins({
  weight: ["200", "400", "500", "700"],
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const mediaMatch = useMediaQuery();
  const isMobile = mediaMatch === "xs" || mediaMatch === "sm";

  const [mobileNavMenuOpen, setMobileNavMenuOpen] = useState<boolean>(false);
  
  return (
    <>
      <Head>
        <title>
          Duckpedia 🦆 - Your go to website for Duck Game at Sirius!
        </title>
        <meta
          name="description"
          content="Your go to website for Duck Game at Sirius!"
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
          <div className="h-full w-full">
            {mobileNavMenuOpen && (
              <MobileNavMenu onClose={() => setMobileNavMenuOpen(false)} />
            )}
            <div
              id="nav-and-layout-container"
              className="h-full w-full transition-all"
            >
              {session &&
                (isMobile ? (
                  <MobileNavBar onOpen={() => setMobileNavMenuOpen(true)} />
                ) : (
                  <NavBar />
                ))}
              {session ? (
                <MainLayout>
                  <Component {...pageProps} />
                </MainLayout>
              ) : (
                <Component {...pageProps} />
              )}
            </div>
          </div>
        </ModalProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
