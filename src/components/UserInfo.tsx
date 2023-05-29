import Image from "next/image";

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
    className={`flex w-full items-center gap-2 ${className}`}
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
    <div className="flex flex-col justify-center items-start">
      <h3 className="font-light">{name}</h3>
      {profileName && <p className="font-light text-black/50 leading-none">{profileName}</p>}
    </div>
  </div>
);

export default UserInfo;
