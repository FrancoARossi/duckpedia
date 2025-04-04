import React, { useRef, useState } from "react";
import Image from "next/image";
import type { ClaimedHat } from "~/types";
import type { Hat } from "@prisma/client";
import useOutsideClick from "~/hooks/useOutsideClick";

type DropdownProps = {
  onChange: (hat: Hat) => void;
  options: (ClaimedHat | Hat)[];
  selected: Hat | null;
};

const Dropdown = ({ onChange, options, selected }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLUListElement>(null);

  useOutsideClick(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const toggleOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative w-[60%]">
      {!!options && !!selected && (
        <div
          className="focus:shadow-outline flex h-20 w-full cursor-pointer justify-start gap-2 rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
          onClick={toggleOpen}
        >
          {!!selected.imageUrl && (
            <div className="relative h-full w-[60%]">
              <Image
                src={selected.imageUrl}
                alt="The hat image"
                fill
                className="object-contain"
              />
            </div>
          )}
          <span className="flex items-center">{selected.name}</span>
        </div>
      )}
      {isOpen && (
        <ul
          ref={ref}
          tabIndex={-1}
          role="listbox"
          className="absolute z-10 mt-1 max-h-48 w-full animate-[fade-in_200ms_ease-out] overflow-auto rounded-md bg-white text-base leading-6 shadow-lg focus:outline-none sm:text-sm sm:leading-5"
        >
          {options?.map((option) => {
            const isClaimed = !!(option as ClaimedHat).claim;

            const handleHatSelect = (e: React.MouseEvent<HTMLElement>) => {
              onChange(option);
              toggleOpen(e);
            };

            return (
              <li
                key={option.id}
                className={`${
                  isClaimed ? "pointer-events-none " : "cursor-pointer "
                }flex h-20 w-full justify-start gap-2 rounded-md bg-white px-4 py-2 pr-8 leading-tight transition-colors hover:bg-slate-100 focus:outline-none`}
                onClick={handleHatSelect}
              >
                {!!option.imageUrl && (
                  <div
                    className={`${
                      isClaimed ? "opacity-50 " : ""
                    }relative h-full w-[60%]`}
                  >
                    <Image
                      src={option.imageUrl}
                      alt="The hat image"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <span
                  className={`${
                    isClaimed ? "opacity-50 " : ""
                  }flex items-center`}
                >
                  {option.name}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
