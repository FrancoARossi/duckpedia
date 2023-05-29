import { type MouseEvent, useContext, useState } from "react";
import { type UserWithClaimHatAndShames } from ".";
import { ModalProviderContext } from "~/components/ModalProvider";
import ShameModalContent from "./ShameModalContent";
import { GiBrokenSkull, GiClown } from "react-icons/gi";
import Image from "next/image";
import { ImArrowUp } from "react-icons/im";
import ShameHistoryModalContent from "./ShameHistoryModalContent";
import UserInfo from "~/components/UserInfo";
import { twMerge } from "tailwind-merge";

const HallOfShameCardContent: React.FC<{
  user: UserWithClaimHatAndShames;
  place: number;
  disableShameButton?: boolean;
}> = ({ user, place, disableShameButton }) => {
  const [shameCount, setShameCount] = useState<number>(user?.shames.length);
  const { setModalProps } = useContext(ModalProviderContext);

  const handleCloseModal = () => setModalProps({ open: false });

  const updateShameCount = (value: number) =>
    setShameCount((prev: number) => prev + value);

  const handleOpenShameModal = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setModalProps({
      open: true,
      title: `Shame on you ${user?.claim.hat.name}!`,
      onClose: handleCloseModal,
      maxHeight: "24rem",
      content: (
        <ShameModalContent
          userId={user?.id}
          closeModal={handleCloseModal}
          updateShameCount={updateShameCount}
        />
      ),
    });
  };

  const handleOpenShamesHistoryModal = () =>
    setModalProps({
      open: true,
      title: `${user?.claim.hat.name}'s shame history`,
      onClose: handleCloseModal,
      maxHeight: "80vh",
      content: <ShameHistoryModalContent userId={user?.id} />,
    });

  const topTierColors = ["bg-red-300", "bg-orange-300", "bg-amber-300"];

  return (
    <div
      className="flex h-fit w-fit flex-col items-center justify-center gap-2"
      onClick={handleOpenShamesHistoryModal}
    >
      <div className="flex w-full items-center absolute top-0 left-0">
        <div
          className={twMerge(
            "flex items-center gap-2 rounded-br-3xl rounded-tl-md bg-slate-300 pr-3 pl-1 py-2 shadow-md",
            topTierColors[place - 1]
          )}
        >
          <GiClown className="text-xl" />
          <span>{place}</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-xl font-semibold">{user?.claim.hat.name}</h2>
        <div className="relative h-[100px] w-[196px]">
          <Image
            src={user?.claim.hat.imageUrl}
            alt={user?.claim.hat.name}
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col items-center">
          <UserInfo
            imageUrl={user?.image}
            name={user?.name || ""}
            profileName={user?.profileName}
          />
        </div>
        <div
          className={`relative flex cursor-pointer justify-center${
            disableShameButton ? " pointer-events-none opacity-50" : ""
          }`}
          onClick={handleOpenShameModal}
          aria-disabled={disableShameButton}
        >
          <ImArrowUp className="text-4xl text-red-700" />
          <GiBrokenSkull className="absolute bottom-0 translate-y-2 text-2xl text-red-500" />
        </div>
        <span className="font-bold text-red-700">{shameCount}</span>
      </div>
    </div>
  );
};

export default HallOfShameCardContent;
