import { FaChurch, FaList, FaBullhorn } from "react-icons/fa6";

const config: SidebarNavConfigItem[] = [
  {
    nameKey: "sidebar.posts",
    to: "/church/website/posts",
    icon: <FaList />,
  },
  {
    nameKey: "sidebar.dyouthAnnouncements",
    to: "/church/website/d-youth-announcements",
    icon: <FaBullhorn />,
  },
  {
    nameKey: "sidebar.church",
    to: "/church/profile",
    icon: <FaChurch />,
  },
];

export interface SidebarNavConfigItem {
  nameKey: string;
  to: string;
  icon: React.ReactElement;
}

export default config;
