import type { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import SimpleBar from "simplebar-react";
import { CBadge, CNavLink, CSidebarNav } from "@coreui/react";
import { useTranslation } from "react-i18next";

import "simplebar-react/dist/simplebar.min.css";

const SidebarNav = ({ items }: SidebarNavProps) => {
  const { t } = useTranslation("common");

  const navLink = (name?: string, nameKey?: string, icon?: ReactElement, badge?: Badge, indent = false) => {
    const displayName = nameKey ? t(nameKey) : name;

    return (
      <>
        {icon
          ? icon
          : indent && (
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
            )}
        {displayName && displayName}
        {badge && (
          <CBadge color={badge.color} className="ms-auto" size="sm">
            {badge.text}
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item: NavItem, index: number, indent = false) => {
    const { component, name, nameKey, badge, icon, ...rest } = item;
    const Component = component;
    return (
      <Component as="div" key={index} className={clsx({ "pl-3": indent })}>
        {rest.to || rest.href ? (
          <CNavLink
            {...(rest.to && { as: NavLink })}
            {...(rest.href && { target: "_blank", rel: "noopener noreferrer" })}
            {...rest}
          >
            {navLink(name, nameKey, icon, badge, indent)}
          </CNavLink>
        ) : (
          navLink(name, nameKey, icon, badge, indent)
        )}
      </Component>
    );
  };

  const navGroup = (item: NavItem, index: number) => {
    const { component, name, nameKey, icon, items, to, ...rest } = item;
    const Component = component;
    return (
      <Component compact as="div" key={index} toggler={navLink(name, nameKey, icon)} {...rest}>
        {items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index, true),
        )}
      </Component>
    );
  };

  return (
    <CSidebarNav as={SimpleBar}>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </CSidebarNav>
  );
};

export default SidebarNav;

interface Badge {
  color: string;
  text: string;
}

interface NavItem {
  component: React.ComponentType<any>;
  name?: string;
  nameKey?: string;
  to?: string;
  href?: string;
  icon?: ReactElement;
  badge?: Badge;
  items?: NavItem[];
  [key: string]: any;
}

interface SidebarNavProps {
  items: NavItem[];
}
