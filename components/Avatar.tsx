import Image from "next/image";

import { useUser } from "@/hooks/useUser";

type Props = {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
};

export const Avatar = ({ userId, isLarge, hasBorder }: Props) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-black" : ""}
        ${isLarge ? "h-32" : "h-12"}
        ${isLarge ? "w-32" : "w-12"}
        rounded-full 
        hover:opacity-90 
        transition 
        relative
  `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        src={fetchedUser?.profileImage ?? "/images/placeholder.png"}
      />
    </div>
  );
};
