import CIcon from "@coreui/icons-react";
import { cilHome, cilFeaturedPlaylist, cilNotes } from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Церква",
    to: "/church/overview",
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Служіння",
  },
  {
    component: CNavGroup,
    name: "Вебсайт",
    to: "/church/posts",
    icon: <CIcon icon={cilFeaturedPlaylist} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Пости",
        to: "/church/posts",
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      },
    ],
  },
];

export default _nav;
