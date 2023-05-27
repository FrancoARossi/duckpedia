import { type MouseEvent, useContext, useState } from "react";
import { type UserWithClaimAndHat } from ".";
import { ModalProviderContext } from "~/components/ModalProvider";
import ShameModalContent from "./ShameModalContent";
import { GiBrokenSkull, GiClown } from "react-icons/gi";
import Image from "next/image";
import { ImArrowUp } from "react-icons/im";
import ShameHistoryModalContent from "./ShameHistoryModalContent";
import UserInfo from "~/components/UserInfo";

const HallOfShameCardContent: React.FC<{
  user: UserWithClaimAndHat;
  place: number;
  disableShameButton?: boolean;
}> = ({ user, place, disableShameButton }) => {
  const [shameCount, setShameCount] = useState<number>(user?.shames?.length);
  const { setModalProps } = useContext(ModalProviderContext);

  const handleCloseModal = () => setModalProps({ open: false });

  const updateShameCount = (value: number) =>
    setShameCount((prev: number) => prev + value);

  const handleOpenShameModal = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setModalProps({
      open: true,
      title: "SHAME ON YOU!",
      onClose: handleCloseModal,
      maxHeight: "24rem",
      content: (
        <ShameModalContent
          userId={user.id}
          closeModal={handleCloseModal}
          updateShameCount={updateShameCount}
        />
      ),
    });
  };

  const handleOpenShamesHistoryModal = () =>
    setModalProps({
      open: true,
      title: "Shame History",
      onClose: handleCloseModal,
      maxHeight: "80vh",
      content: <ShameHistoryModalContent userId={user.id} />,
    });

  return (
    <div
      className="grid w-full cursor-pointer grid-cols-[100px_2fr_1fr_100px]"
      onClick={handleOpenShamesHistoryModal}
    >
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
      <UserInfo
        imageUrl={user.image}
        name={user.name || ""}
        profileName={user.profileName}
      />
      <div className="flex w-full items-center">
        <div className="flex w-full flex-col items-center justify-center gap-2">
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
    </div>
  );
};

export default HallOfShameCardContent;
