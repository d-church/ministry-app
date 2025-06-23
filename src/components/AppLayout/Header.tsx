import { useEffect, useRef } from "react";
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CAvatar,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilMenu,
  cilUser,
  cilSettings,
  cilLockLocked,
} from "@coreui/icons";
import avatar8 from "./../../assets/images/avatars/8.jpg";

import AppBreadcrumb from "../AppBreadcrumb";


import { LayoutState } from "./LayoutState";

const Header = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      headerRef.current?.classList.toggle(
        "shadow-sm",
        document.documentElement.scrollTop > 0
      );
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => LayoutState.toggleSidebarState()}
          style={{ marginInlineStart: "-14px" }}
          aria-label="Toggle sidebar"
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>

          <CDropdown variant="nav-item">
            <CDropdownToggle className="py-0 pe-0" caret={false}>
              <CAvatar src={avatar8} size="md" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0">
              <CDropdownItem href="#">
                <CIcon icon={cilUser} className="me-2" />
                Профіль
              </CDropdownItem>
              <CDropdownItem href="#">
                <CIcon icon={cilSettings} className="me-2" />
                Налаштування
              </CDropdownItem>
              <CDropdownDivider />
              <CDropdownItem href="#">
                <CIcon icon={cilLockLocked} className="me-2" />
                Вийти
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
      </CContainer>

      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
};

export default Header;
