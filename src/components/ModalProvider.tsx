import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useState,
} from "react";

type ModalContextState = {
  open: boolean;
  title: string;
  onClose: () => void;
  content: ReactNode;
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
}: Partial<ModalContextState>) => {
  if (!open) return null;

  return (
    <div className="fixed z-10 h-full w-full backdrop-blur-[2px] backdrop-brightness-50 transition-backdrop-filter">
      <dialog className="inset-0 flex h-full w-full max-w-lg max-h-96 flex-col items-center justify-center rounded-lg drop-shadow-xl">
        {!!title && (
          <h1 className="text-center text-2xl font-extralight text-slate-700">
            {title}
          </h1>
        )}
        <div className="h-full w-full">
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
