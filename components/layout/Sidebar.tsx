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

const Sidebar = () => {
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
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BiBell,
    },
    {
      label: "Messages",
      href: "/messages",
      icon: BiEnvelope,
    },
    {
      label: "Lists",
      href: "/lists",
      icon: BiListUl,
    },
    {
      label: "Profile",
      href: "/users/123",
      icon: BiUser,
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
            />
          ))}
          <SidebarItem onClick={() => {}} icon={BiLogOut} label="Logout" />
          <SidebarPostButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
