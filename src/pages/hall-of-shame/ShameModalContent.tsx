import { type ChangeEvent, useState } from "react";
import Button from "~/components/Button";
import TextArea from "~/components/TextArea";
import { api } from "~/utils/api";

const ShameModalContent = ({
  userId,
  closeModal,
  updateShameCount,
}: {
  userId: string;
  closeModal: () => void;
  updateShameCount: (value: number) => void;
}) => {
  const [shameNote, setShameNote] = useState<string>("");
  const { mutate: createShame } = api.shames.createShame.useMutation({
    onError: () => updateShameCount(-1),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createShame({ userId, note: shameNote });
    // Optimistic shame count update
    updateShameCount(1);
    closeModal();
  };

  return (
    <form
      className="grid h-full w-full grid-rows-[1fr,52px]"
      onSubmit={handleSubmit}
    >
      <div className="flex h-52 w-full items-center justify-center">
        <TextArea
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setShameNote(e.target.value)
          }
          placeholder="Why are you shaming this person?"
          maxLength={190}
        />
      </div>
      <div className="bottom-0 flex items-end justify-end self-end">
        <Button label="Submit" disabled={!shameNote} />
      </div>
    </form>
  );
};

export default ShameModalContent;
