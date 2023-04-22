import { BiGroup, BiLogOut } from "react-icons/bi";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { RiFileShield2Fill } from "react-icons/ri";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarItem } from "./SidebarItem";
import { SidebarPostButton } from "./SidebarPostButton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

export const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notification",
      href: "/notifications",
      icon: FaUser,
      auth: true,
      alert: currentUser?.hasNotification ?? undefined,
    },
    {
      label: "Files",
      href: "/files",
      icon: RiFileShield2Fill,
      auth: true,
    },
    {
      label: "Groups",
      href: "/groups",
      icon: BiGroup,
      auth: true,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: BsBellFill,
      auth: true,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
              alert={item.alert}
            />
          ))}
          {currentUser && (
            <SidebarItem onClick={signOut} icon={BiLogOut} label="Logout" />
          )}
          <SidebarPostButton />
        </div>
      </div>
    </div>
  );
};
