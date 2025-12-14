import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import { FaChurch, FaInternetExplorer, FaList, FaBullhorn } from "react-icons/fa6";

const config: SidebarNavConfigItem[] = [
  {
    component: CNavItem,
    nameKey: "sidebar.church",
    to: "/church/profile",
    icon: <FaChurch className="nav-icon" />,
  },
  {
    component: CNavTitle,
    nameKey: "sidebar.ministries",
  },
  {
    component: CNavGroup,
    nameKey: "sidebar.website",
    to: "/church/website",
    icon: <FaInternetExplorer className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        nameKey: "sidebar.posts",
        to: "/church/website/posts",
        icon: <FaList className="nav-icon" />,
      },
      {
        component: CNavItem,
        nameKey: "sidebar.dyouthAnnouncements",
        to: "/church/website/dyouth-announcements",
        icon: <FaBullhorn className="nav-icon" />,
      },
    ],
  },
];

interface SidebarNavConfigItem {
  component: React.ComponentType<any>;
  name?: string;
  nameKey?: string;
  to?: string;
  href?: string;
  icon?: React.ReactElement;
  badge?: { color: string; text: string };
  items?: SidebarNavConfigItem[];
}

export default config;
