import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

type ModalContextState = {
  open: boolean;
  title: string;
  onClose: () => void;
  content: ReactNode;
  className?: string;
};

export const ModalProviderContext = createContext<{
  setModalProps: Dispatch<SetStateAction<Partial<ModalContextState>>>;
}>({
  setModalProps: () => null,
});

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalProps, setModalProps] = useState<Partial<ModalContextState>>({
    open: false,
    onClose: () => null,
    content: <></>,
    title: "",
  });

  return (
    <ModalProviderContext.Provider value={{ setModalProps }}>
      <Modal {...modalProps} />
      {children}
    </ModalProviderContext.Provider>
  );
};

const Modal = ({
  open,
  title,
  onClose,
  content,
  className,
}: Partial<ModalContextState>) => {
  if (!open) return null;

  return (
    <div className="fixed z-10 h-full w-full backdrop-blur-[2px] backdrop-brightness-50 transition-backdrop-filter">
      <dialog
        className={twMerge(
          "inset-0 flex h-full min-h-[24rem] max-w-lg flex-col items-center overflow-hidden rounded-lg drop-shadow-xl xs:w-[90%] md:w-full",
          className
        )}
      >
        {!!title && (
          <h1 className="text-center text-2xl text-slate-700">{title}</h1>
        )}
        <div className="mt-3 h-full w-full overflow-y-auto overflow-x-hidden">
          {!!onClose && (
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="absolute right-0 top-0 mr-4 mt-4 h-10 w-10 cursor-pointer rounded-full p-1 text-black transition-colors hover:bg-gray-100 hover:text-gray-700"
              onClick={onClose}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          )}
          {content}
        </div>
      </dialog>
    </div>
  );
};

export default ModalProvider;
