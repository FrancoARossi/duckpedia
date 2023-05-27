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
import Card from "~/components/Card";
import InputText from "~/components/InputText";
import useDebounce from "~/hooks/useDebounce";
import UserInfo from "~/components/UserInfo";

const Claims: NextPage = () => {
  const { data: claims, isLoading } = api.claims.getAll.useQuery();
  const { setModalProps } = useContext(ModalProviderContext);
  const [search, setSearch] = useState<string>("");

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const debouncedSearch = useDebounce(handleSearch, 500);

  const handleCloseClaimModal = () => setModalProps({ open: false });

  const handleOpenClaimModal = () =>
    setModalProps({
      open: true,
      title: "Choose wisely...",
      onClose: handleCloseClaimModal,
      content: <ClaimModalContent closeModal={handleCloseClaimModal} />,
    });

  const filterClaims = (
    claims: ClaimWithHatAndUser[]
  ): ClaimWithHatAndUser[] => {
    if (!search) return claims;
    return claims.filter(
      (claim) =>
        claim.hat.name.toLowerCase().includes(search.toLowerCase()) ||
        claim.claimedBy?.name?.toLowerCase().includes(search.toLowerCase()) ||
        claim.claimedBy?.profileName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        claim.claimedBy?.email?.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <main className="flex w-full max-w-8xl animate-fade-in-from-top flex-col gap-8 xs:h-[90%] md:h-[80%]">
      <div className="flex flex-col gap-2 rounded-md bg-slate-50 xs:px-4 xs:py-2 md:px-8 md:py-4">
        <div className="flex flex-row items-center justify-between">
          <h1 className="font-extralight xs:text-xl xs:font-bold md:text-3xl">
            Claimed Hats 🎩
          </h1>
          <Button label="Claim a Hat" onClick={handleOpenClaimModal} />
        </div>
        <div className="flex gap-4">
          <InputText
            defaultValue={search}
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>
      </div>
      <section className="grid h-full w-full auto-rows-[300px] grid-cols-claims gap-x-4 gap-y-3 overflow-auto p-2 xs:justify-center sm:justify-normal">
        {isLoading &&
          [...Array(5).keys()].map((i) => (
            <SkeletonLoader
              key={`skeleton_claim_${i}`}
              className="rounded-md"
            />
          ))}
        {claims &&
          filterClaims(claims).map((claim) => (
            <Card
              key={claim.id}
              className="md:max-w-[220px]"
              content={<ClaimCardContent claim={claim} />}
            />
          ))}
      </section>
    </main>
  );
};

const ClaimCardContent: React.FC<{ claim: ClaimWithHatAndUser }> = ({
  claim,
}) => (
  <div className="flex h-full w-full flex-col items-center justify-center gap-2">
    <div className="flex flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-semibold">{claim.hat.name}</h2>
      <div className="relative h-[100px] w-[196px]">
        <Image
          src={claim.hat.imageUrl}
          alt={claim.hat.name}
          fill
          className="object-contain"
        />
      </div>
    </div>
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full flex-col items-center">
        <h3 className="font-extralight opacity-70">Claimed by</h3>
        {claim.claimedBy && (
          <UserInfo
            imageUrl={claim.claimedBy.image}
            name={claim.claimedBy.name || ""}
            profileName={claim.claimedBy?.profileName}
            className="justify-center"
          />
        )}
      </div>
      <div className="flex w-full flex-col items-center">
        <h3 className="font-extralight opacity-70">Claimed at</h3>
        <h3 className="font-light">{formatDate(claim.claimedAt as Date)}</h3>
      </div>
    </div>
  </div>
);

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
