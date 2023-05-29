import Image from "next/image";
import { twMerge } from "tailwind-merge";

type UserInfoProps = {
  imageUrl: string | null;
  name: string;
  profileName: string | null;
  className?: string;
};

const UserInfo: React.FC<UserInfoProps> = ({
  imageUrl,
  name,
  profileName,
  className = "",
}) => (
  <div
    className={twMerge(
      "flex h-fit w-fit items-center gap-2 rounded-full bg-cyan-300 px-3 py-1 shadow-sm",
      className
    )}
  >
    {imageUrl && (
      <Image
        src={imageUrl}
        alt={name}
        width={30}
        height={30}
        className="rounded-full"
      />
    )}
    <div className="flex flex-col items-start justify-center">
      <h3 className="font-light">{name}</h3>
      {profileName && (
        <p className="font-light leading-none text-black/50">{profileName}</p>
      )}
    </div>
  </div>
);

export default UserInfo;
