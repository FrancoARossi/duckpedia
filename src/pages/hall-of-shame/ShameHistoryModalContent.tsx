import Card from "~/components/Card";
import SkeletonLoader from "~/components/SkeletonLoader";
import UserInfo from "~/components/UserInfo";
import { api } from "~/utils/api";
import { formatDate } from "~/utils/formatDate";

const ShameHistoryModalContent = ({ userId }: { userId: string }) => {
  const { data: shames, isLoading } = api.shames.getAllByUserId.useQuery({
    userId,
  });

  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      {isLoading &&
        [...Array(3).keys()].map((i) => (
          <div key={`skeleton_shame_${i}`} className="w-full">
            <SkeletonLoader className="h-24 w-full rounded" />
          </div>
        ))}
      {shames?.map((shame) => (
        <Card key={shame.id} className="h-fit w-full" disableDefaultHover>
          <div className="flex flex-col gap-4">
            <p>{shame.note}</p>
            <div className="flex justify-between">
              <UserInfo
                imageUrl={shame.shamedBy.image}
                name={shame.shamedBy.name || ""}
                profileName={shame.shamedBy.profileName}
              />
              <span className="text-sm text-black/60">
                {formatDate(shame.createdAt)}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ShameHistoryModalContent;
