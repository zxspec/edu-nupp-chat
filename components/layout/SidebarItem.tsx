import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useLoginModal } from "@/hooks/useLoginModal";
import { BsDot } from "react-icons/bs";
import { useRouter } from "next/router";
import { useCallback } from "react";
import type { IconType } from "react-icons";

type Props = {
  icon: IconType;
  label: string;
  href?: string;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
};

export const SidebarItem = ({
  icon: Icon,
  label,
  onClick,
  href,
  auth,
  alert,
}: Props) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [onClick, auth, currentUser, href, loginModal, router]);

  return (
    <div className="flex flex-row items-center" onClick={handleClick}>
      <div
        className="
        relative
        rounded-full 
        h-14 
        w-14 
        flex 
        items-center 
        justify-center 
        p-4 
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer
        lg:hidden
    "
      >
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={80} />
        ) : null}
      </div>
      <div
        className="
        relative
        hidden
        lg:flex
        items-center 
        gap-4
        p-4
        rounded-full
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer
    "
      >
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />
        ) : null}
      </div>
    </div>
  );
};