import type { NextPage, GetServerSidePropsContext } from "next";
import requireAuthentication from "~/utils/requireAuthentication";
import Card from "~/components/Card";
import { ImArrowUp } from "react-icons/im";
import { GiBrokenSkull } from "react-icons/gi";
import Image from "next/image";
import { api } from "~/utils/api";
import SkeletonLoader from "~/components/SkeletonLoader";
import { GiClown } from "react-icons/gi";
import type { Claim, Hat, Shame, User } from "@prisma/client";
import { type ChangeEvent, useContext, useState } from "react";
import { ModalProviderContext } from "~/components/ModalProvider";
import Button from "~/components/Button";
import TextArea from "~/components/TextArea";

export type UserWithClaimAndHat = User & {
  claim: Claim & {
    hat: Hat;
  };
  shames: Shame[];
};

const HallOfShame: NextPage = () => {
  const { data: users, isLoading } =
    api.users.getAllWithClaimAndShames.useQuery();

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
      {users &&
        users.map((user, index) => (
          <Card
            key={user.id}
            className="w-full"
            content={
              <HallOfShameCardContent
                user={user as UserWithClaimAndHat}
                place={index + 1}
              />
            }
          />
        ))}
    </main>
  );
};

const HallOfShameCardContent: React.FC<{
  user: UserWithClaimAndHat;
  place: number;
}> = ({ user, place }) => {
  const [shameCount, setShameCount] = useState<number>(user.shames.length);
  const { setModalProps } = useContext(ModalProviderContext);

  const handleCloseShameModal = () => setModalProps({ open: false });

  const updateShameCount = (value: number) =>
    setShameCount((prev: number) => prev + value);

  const handleOpenShameModal = () =>
    setModalProps({
      open: true,
      title: "SHAME ON YOU!",
      onClose: handleCloseShameModal,
      content: (
        <ShameModalContent
          userId={user.id}
          closeModal={handleCloseShameModal}
          updateShameCount={updateShameCount}
        />
      ),
    });

  return (
    <div className="grid w-full grid-cols-[100px_2fr_1fr_100px]">
      <div className="flex w-full items-center">
        <div className="flex items-center gap-2 rounded-lg bg-slate-300 px-4 py-2 shadow-md">
          <GiClown className="text-xl" />
          <span>{place}</span>
        </div>
      </div>
      <div className="flex w-full items-center">
        <div className="relative h-full w-[40%]">
          <Image
            src={user.claim.hat.imageUrl}
            alt={user.claim.hat.name}
            fill
            className="object-contain"
          />
        </div>
        <span>{user.claim.hat.name}</span>
      </div>
      <div className="flex w-full items-center">
        <Image
          src={user.image as string}
          alt={user.name as string}
          width={45}
          height={45}
          className="rounded-full"
        />
        <span className="ml-4">{user?.name}</span>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <div
            className="relative flex cursor-pointer justify-center"
            onClick={handleOpenShameModal}
          >
            <ImArrowUp className="text-4xl text-red-700" />
            <GiBrokenSkull className="absolute bottom-0 translate-y-2 text-2xl text-red-500" />
          </div>
          <span className="font-bold text-red-700">{shameCount}</span>
        </div>
      </div>
    </div>
  );
};

const ShameModalContent = ({
  userId,
  closeModal,
  updateShameCount,
}: {
  userId: string;
  closeModal: () => void;
  updateShameCount: (value: number) => void;
}) => {
  const [shameNote, setShameNote] = useState<string>("");
  const { mutate: createShame } = api.shames.createShame.useMutation({
    onError: () => updateShameCount(-1),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createShame({ userId, note: shameNote });
    updateShameCount(1);
    closeModal();
  };

  return (
    <form
      className="grid h-full w-full grid-rows-[1fr,52px]"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full items-center justify-center">
        <TextArea
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setShameNote(e.target.value)
          }
          placeholder="Why are you shaming this person?"
        />
      </div>
      <div className="bottom-0 flex items-end justify-end self-end">
        <Button label="Submit" disabled={!shameNote} />
      </div>
    </form>
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
