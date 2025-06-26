import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import { FaChurch, FaInternetExplorer, FaList } from "react-icons/fa6";

const _nav = [
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
];

export default _nav;
