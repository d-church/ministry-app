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
} from "@coreui/react";
import { FaRegUser, FaGear, FaDoorOpen, FaBars, FaCircleUser } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

import LayoutState from "./LayoutState";
import Breadcrumb from "../Breadcrumb";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation("common");

  useEffect(() => {
    const handleScroll = () => {
      headerRef.current?.classList.toggle("shadow-sm", document.documentElement.scrollTop > 0);
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
          className="opacity-55"
        >
          <FaBars />
        </CHeaderToggler>

        <CHeaderNav>
          <LanguageSwitcher />

          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>

          <CDropdown variant="nav-item">
            <CDropdownToggle className="py-0 pe-0" caret={false}>
              <FaCircleUser size="35px" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0 overflow-hidden">
              <CDropdownItem href="#" className="d-flex align-items-center">
                <FaRegUser className="me-2 inline" />
                {t("header.profile")}
              </CDropdownItem>
              <CDropdownItem href="#" className="d-flex align-items-center">
                <FaGear className="me-2 inline" />
                {t("header.settings")}
              </CDropdownItem>
              <CDropdownDivider />
              <CDropdownItem href="#" className="d-flex align-items-center">
                <FaDoorOpen className="me-2 inline" />
                {t("header.logout")}
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
      </CContainer>

      <CContainer className="px-4" fluid>
        <Breadcrumb />
      </CContainer>
    </CHeader>
  );
};

export default Header;
