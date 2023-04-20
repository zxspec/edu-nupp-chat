import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { ClickableAvatar } from "../ClickableAvatar";

type Props = {
  userId: string;
};
export function UserHero({ userId }: Props) {
  const { data: fetchedUser } = useUser(userId);
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser.coverImage}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <ClickableAvatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
}
