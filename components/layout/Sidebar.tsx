import {
  BiBell,
  BiEnvelope,
  BiHome,
  BiListUl,
  BiLogOut,
  BiSearch,
  BiUser,
} from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarPostButton from "./SidebarPostButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();
  // Check if user is logged in to hide/show log out button
  const items = [
    {
      label: "Home",
      href: "/",
      icon: BiHome,
    },
    {
      label: "Explore",
      href: "/explore",
      icon: BiSearch,
      auth: true,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BiBell,
      auth: true,
    },
    {
      label: "Messages",
      href: "/messages",
      icon: BiEnvelope,
      auth: true,
    },
    {
      label: "Lists",
      href: "/lists",
      icon: BiListUl,
      auth: true,
    },
    {
      label: "Profile",
      href: `/users/$currentUser?.username`,
      icon: BiUser,
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
            />
          ))}
          {currentUser && (
            // Logout button available only if user is logged in
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label="Logout"
            />
          )}
          <SidebarPostButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
