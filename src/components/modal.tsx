import React, { useState } from "react";
import Button from "./button";
import HatsDropdown from "./hats_dropdown";
import type { Hat } from "@prisma/client";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (hat: Hat | null) => void;
};

const Modal = ({ open, onClose, onSubmit }: ModalProps) => {
  const [selectedHat, setSelectedHat] = useState<Hat | null>(null);

  if (!open) return null;

  const handleSubmit = () => {
    onSubmit(selectedHat);
    onClose();
  };

  const handleHatSelect = (hat: Hat) => setSelectedHat(hat);

  return (
    <div className="fixed z-10 h-full w-full backdrop-blur-[2px] backdrop-brightness-50 transition-backdrop-filter">
      <dialog className="inset-0 flex h-[50%] w-[40%] items-center justify-center rounded-lg drop-shadow-xl">
        <form className="flex h-full w-full flex-col items-center pt-24">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="absolute right-0 top-0 mr-4 mt-4 h-10 w-10 cursor-pointer rounded-full p-1 text-black transition-colors hover:bg-gray-100 hover:text-gray-700"
            onClick={onClose}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          <div className="flex w-[60%]">
            <span className="self-start text-sm text-opacity-80 text-gray-900">
              Choose your hat:
            </span>
          </div>
          <HatsDropdown onChange={handleHatSelect}/>
          <div className="absolute bottom-0 flex items-end justify-end self-end p-5">
            <Button label="Claim!" onClick={handleSubmit} disabled={!selectedHat} />
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default Modal;
