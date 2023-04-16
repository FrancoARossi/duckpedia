import { type GetServerSidePropsContext, type NextPage } from "next";
import { api } from "~/utils/api";
import requireAuthentication from "~/utils/requireAuthentication";
import type { Hat, User } from "@prisma/client";
import Image from "next/image";
import Button from "~/components/Button";
import {
  useCallback,
  useEffect,
  useState,
  useContext,
  type SyntheticEvent,
} from "react";
import type { ClaimWithHatAndUser, ClaimedHat } from "~/types";
import Dropdown from "~/components/Dropdown";
import { ModalProviderContext } from "~/components/ModalProvider";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { formatDate } from "~/utils/formatDate";
import SkeletonLoader from "~/components/SkeletonLoader";

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
    <main className="flex h-[80%] w-full max-w-7xl animate-fade-in-from-top flex-col gap-8 overflow-hidden rounded-xl bg-white px-4 py-8 drop-shadow">
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
          {isLoading &&
            [...Array(3).keys()].map((i) => (
              <tr
                key={`skeleton-${i}`}
                className="flex items-center justify-center"
              >
                <td className="w-full">
                  <SkeletonLoader className="h-[4rem] rounded-md" />
                </td>
              </tr>
            ))}
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
                    <span>{formatDate(claim.claimedAt)}</span>
                  ) : (
                    <span className="opacity-50">Not claimed</span>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
};

const ClaimModalContent = ({ closeModal }: { closeModal: () => void }) => {
  const {
    data: hats,
    isLoading,
    isError,
  } = api.hats.getAllWithClaims.useQuery();
  const trpcUtils = api.useContext();
  const [selectedHat, setSelectedHat] = useState<Hat | null>(null);
  const { data: session }: { data: Session | null } = useSession();

  const { mutate: claimHat } = api.claims.claimHat.useMutation({
    onSuccess: () => {
      trpcUtils.claims.getAll.setData(
        undefined,
        (claims: ClaimWithHatAndUser[] | undefined) => {
          if (claims) {
            const claimerIds = claims?.map((claim) => claim.claimedBy?.id);
            if (session && claimerIds?.includes(session.user.id)) {
              return claims?.map((claim) => {
                if (claim.claimedBy?.id === session?.user.id) {
                  return {
                    ...claim,
                    claimedAt: new Date(),
                    hat: selectedHat as Hat,
                    hatId: selectedHat?.id as string,
                  };
                }
                return claim;
              });
            } else {
              return [
                {
                  id: new Date().toISOString(),
                  hat: selectedHat as Hat,
                  hatId: selectedHat?.id as string,
                  claimedBy: session?.user as User | null,
                  claimedById: session?.user.id as string,
                  claimedAt: new Date(),
                } as ClaimWithHatAndUser,
                ...claims,
              ] as ClaimWithHatAndUser[];
            }
          }
        }
      );
    },
  });

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
      className="grid h-full w-full grid-rows-[1fr,52px]"
      onSubmit={handleSubmit}
    >
      {isLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <SkeletonLoader className="h-20 w-[60%] rounded" />
        </div>
      )}
      {isError && (
        <div className="flex items-center justify-center text-red-500">
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
