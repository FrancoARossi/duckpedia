import { type GetServerSidePropsContext, type NextPage } from "next";
import { api } from "~/utils/api";
import requireAuthentication from "~/utils/requireAuthentication";
import type { User, Hat } from "@prisma/client";
import Image from "next/image";
import Button from "~/components/button";
import { useState } from "react";
import Modal from "~/components/modal";

export type Claim = {
  id: number;
  hat: Hat;
  claimedBy: User;
  claimDate: string;
};

const Claims: NextPage = () => {
  const [openClaimModal, setOpenClaimModal] = useState<boolean>(false);
  const { data: claims, isLoading, isError } = api.claims.getAll.useQuery();

  const handleOpenClaimModal = () => setOpenClaimModal(true);

  const handleCloseClaimModal = () => setOpenClaimModal(false);

  const handleSubmitClaim = () => {
    handleCloseClaimModal();
  };

  return (
    <>
      <Modal
        open={openClaimModal}
        onSubmit={handleSubmitClaim}
        onClose={handleCloseClaimModal}
      />
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
