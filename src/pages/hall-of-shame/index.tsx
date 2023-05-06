//import { type GetServerSidePropsContext } from "next";
//import requireAuthentication from "~/utils/requireAuthentication";
import Card from "~/components/Card";
import { ImArrowUp } from "react-icons/im";
import { GiBrokenSkull } from "react-icons/gi";
//import { useRouter } from "next/router";

const HallOfShame = () => {
  return (
    <main className="flex w-full max-w-8xl animate-fade-in-from-top flex-col items-center gap-8 xs:h-[90%] md:h-[80%]">
      <Card className="w-full" content={<HallOfShameCardContent />} />
    </main>
  );
};

const HallOfShameCardContent = () => {
  return (
    <div className="grid h-24 w-full grid-cols-3">
      <div className="relative w-fit">
        <ImArrowUp className="text-5xl text-slate-700" />
        <GiBrokenSkull className="absolute text-3xl text-slate-400 bottom-0 left-[50%]" />
      </div>
    </div>
  );
};

export const getServerSideProps = (
  //context: GetServerSidePropsContext
) => {
  //tmp disable this page until its done
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };

  /* return requireAuthentication(context, ({ session }) => {
    return {
      props: {
        session,
      },
    };
  }); */
};

export default HallOfShame;
