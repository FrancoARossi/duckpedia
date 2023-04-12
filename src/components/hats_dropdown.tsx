import React, { useCallback, useEffect, useState } from "react";
import type { Hat, Prisma } from "@prisma/client";
import { api } from "~/utils/api";
import Image from "next/image";

export type ClaimedHat = Prisma.HatGetPayload<{
  include: { claim: true };
}>;

const HatsDropdown = ({ onChange }: { onChange: (hat: Hat) => void }) => {
  const { data: hats, isLoading, isError } = api.hats.getAll.useQuery();
  const [selectedHat, setSelectedHat] = useState<Hat | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (hats && hats.length > 0) {
      setSelectedHat(hats.find((hat) => !hat.claim) || null);
    }
  }, [hats]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const filterAndSortHats = useCallback(
    (hats: ClaimedHat[]) => {
      let newHats = hats?.filter((hat) => hat.id !== selectedHat?.id);
      newHats = newHats?.sort((a, b) => {
        if (a.claim && !b.claim) {
          return 1;
        }
        if (!a.claim && b.claim) {
          return -1;
        }
        return 0;
      });

      return newHats;
    },
    [selectedHat]
  );

  return (
    <div className="relative w-[60%]">
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
      {hats && selectedHat && (
        <div
          className="focus:shadow-outline flex h-20 w-full cursor-pointer justify-start gap-2 rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
          onClick={isOpen ? handleClose : handleOpen}
        >
          <div className="relative h-full w-[60%]">
            <Image
              src={selectedHat.imageUrl}
              alt="The hat image"
              fill
              className="object-contain"
            />
          </div>
          <span className="flex items-center">{selectedHat.name}</span>
        </div>
      )}
      {isOpen && (
        <ul
          tabIndex={-1}
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-item-3"
          className="shadow-xs absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md text-base leading-6 shadow-lg focus:outline-none sm:text-sm sm:leading-5"
        >
          {hats &&
            filterAndSortHats(hats).map((hat) => {
              const isClaimed = !!hat.claim;

              const handleHatSelect = () => {
                setSelectedHat(hat);
                handleClose();
                onChange(hat);
              };

              return (
                <li
                  key={hat.id}
                  className={`${
                    isClaimed ? "pointer-events-none " : "cursor-pointer "
                  }flex h-20 w-full justify-start gap-2 border-y bg-white px-4 py-2 pr-8 leading-tight hover:border-gray-500 focus:outline-none`}
                  onClick={handleHatSelect}
                >
                  <div
                    className={`${
                      isClaimed ? "opacity-50 " : ""
                    }relative h-full w-[60%]`}
                  >
                    <Image
                      src={hat.imageUrl}
                      alt="The hat image"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span
                    className={`${
                      isClaimed ? "opacity-50 " : ""
                    }flex items-center`}
                  >
                    {hat.name}
                  </span>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default HatsDropdown;
