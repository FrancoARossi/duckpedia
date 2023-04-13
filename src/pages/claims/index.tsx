import { type GetServerSidePropsContext, type NextPage } from "next";
import { api } from "~/utils/api";
import requireAuthentication from "~/utils/requireAuthentication";
import type { User, Hat } from "@prisma/client";
import Image from "next/image";
import Button from "~/components/Button";
import {
  useCallback,
  useEffect,
  useState,
  useContext,
  SyntheticEvent,
} from "react";
import type { ClaimedHat } from "~/types";
import Dropdown from "~/components/Dropdown";
import { ModalProviderContext } from "~/components/ModalProvider";

export type Claim = {
  id: number;
  hat: Hat;
  claimedBy: User;
  claimDate: string;
};

const Claims: NextPage = () => {
  const { data: claims, isLoading, isError } = api.claims.getAll.useQuery();
  const { setModalProps } = useContext(ModalProviderContext);

  const handleCloseClaimModal = () => setModalProps({ open: false });

  const handleOpenClaimModal = () =>
    setModalProps({
      open: true,
      title: "Choose wisely...",
      onClose: handleCloseClaimModal,
      content: <ClaimModalContent closeModal={handleCloseClaimModal} />,
    });

  return (
    <>
      <div className="flex h-[80%] w-full max-w-7xl animate-fade-in flex-col gap-8 overflow-hidden rounded-xl bg-white px-4 py-8 drop-shadow">
        <div className="flex flex-row items-center justify-between px-8">
          <h1 className="text-3xl font-extralight">Hat Ownerships</h1>
          <Button label="Claim a Hat" onClick={handleOpenClaimModal} />
        </div>
        <table className="flex h-full flex-col gap-3">
          <thead className="block">
            <tr className="grid grid-cols-5 [&>*]:text-zinc-700">
              <th>Hat</th>
              <th>Hat Name</th>
              <th>Owner</th>
              <th>Profile Name</th>
              <th>Claim Date</th>
            </tr>
          </thead>
          <tbody style={{ overflow: "overlay" }} className="block h-full">
            {isLoading && (
              <tr className="flex items-center justify-center">
                <td>Loading...</td>
              </tr>
            )}
            {isError && (
              <tr className="flex items-center justify-center">
                <td>An error has occur</td>
              </tr>
            )}
            {!!claims &&
              claims.map((claim) => (
                <tr
                  key={claim.id}
                  className="grid h-[4rem] grid-cols-5 rounded-md transition-colors hover:bg-slate-100 [&>*]:flex [&>*]:items-center [&>*]:justify-center"
                >
                  <td className="relative">
                    <Image
                      src={claim.hat.imageUrl}
                      alt="The hat image"
                      fill
                      className="object-contain"
                    />
                  </td>
                  <td>{claim.hat.name}</td>
                  <td>
                    {claim.claimedBy ? (
                      <div className="flex items-center gap-2">
                        {!!claim.claimedBy.image && (
                          <div className="relative h-9 w-9">
                            <Image
                              src={claim.claimedBy.image}
                              alt="Owner profile picture"
                              fill
                              className="rounded-full object-contain"
                            />
                          </div>
                        )}
                        <span>{claim.claimedBy.name}</span>
                      </div>
                    ) : (
                      <span className="opacity-50">Not claimed</span>
                    )}
                  </td>
                  <td>
                    {claim.claimedBy ? (
                      claim.claimedBy.profileName || (
                        <span className="opacity-50">No profile name</span>
                      )
                    ) : (
                      <span className="opacity-50">Not claimed</span>
                    )}
                  </td>
                  <td>
                    {!!claim.claimedAt ? (
                      new Date(claim.claimedAt).toDateString()
                    ) : (
                      <span className="opacity-50">Not claimed</span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const ClaimModalContent = ({ closeModal }: { closeModal: () => void }) => {
  const {
    data: hats,
    isLoading,
    isError,
  } = api.hats.getAllWithClaims.useQuery();
  const [selectedHat, setSelectedHat] = useState<Hat | null>(null);
  const { mutate: claimHat } = api.claims.claimHat.useMutation();

  useEffect(() => {
    if (hats && hats.length > 0) {
      setSelectedHat(hats.find((hat) => !hat.claim) || null);
    }
  }, [hats]);

  const filterHats: (hats: (ClaimedHat | Hat)[]) => (ClaimedHat | Hat)[] =
    useCallback(
      (hats: (ClaimedHat | Hat)[]) => {
        return hats?.filter((hat) => hat.id !== selectedHat?.id);
      },
      [selectedHat]
    );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!!selectedHat) {
      claimHat(selectedHat.id);
      closeModal();
    }
  };

  return (
    <form
      className="flex h-full w-full flex-col items-center"
      onSubmit={handleSubmit}
    >
      {isLoading && (
        <div className="flex items-center justify-center">
          <div className="loader mb-4 h-6 w-6 rounded-full border-4 border-t-4 border-gray-200 ease-linear"></div>
        </div>
      )}
      {isError && (
        <div className="flex items-center justify-center">
          <p>An error has occur</p>
        </div>
      )}
      {!!hats && (
        <div className="flex h-full w-full items-center justify-center">
          <Dropdown
            options={filterHats(hats)}
            selected={selectedHat}
            onChange={setSelectedHat}
          />
        </div>
      )}
      <div className="bottom-0 flex items-end justify-end self-end">
        <Button label="Claim!" disabled={!selectedHat} />
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

export default Claims;
