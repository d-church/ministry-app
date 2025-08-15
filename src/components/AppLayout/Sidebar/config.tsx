import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import { FaChurch, FaInternetExplorer, FaList } from "react-icons/fa6";
import { FaPray } from "react-icons/fa";

const config: SidebarNavConfigItem[] = [
  {
    component: CNavItem,
    name: "Церква",
    to: "/church/overview",
    icon: <FaChurch className="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Служіння",
  },
  {
    component: CNavGroup,
    name: "Вебсайт",
    to: "/church/website",
    icon: <FaInternetExplorer className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Пости",
        to: "/church/website/posts",
        icon: <FaList className="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Молитва",
    to: "/church/prayer",
    icon: <FaPray className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Молитовні потреби",
        to: "/church/prayer/requests",
        icon: <FaPray className="nav-icon" />,
      },
    ],
  },
];

interface SidebarNavConfigItem {
  component: React.ComponentType<any>;
  name?: string;
  to?: string;
  href?: string;
  icon?: React.ReactElement;
  badge?: { color: string; text: string };
  items?: SidebarNavConfigItem[];
}

export default config;
