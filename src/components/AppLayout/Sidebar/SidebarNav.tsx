import { NavLink, useResolvedPath, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import type { SidebarNavConfigItem } from "./config";

const SidebarNavItem = ({ item, label }: { item: SidebarNavConfigItem; label: string }) => {
  const resolved = useResolvedPath(item.to);
  const location = useLocation();
  const isActive = location.pathname === resolved.pathname;

  return (
    <NavLink
      to={item.to}
      className={clsx(
        "flex items-center gap-3 px-3 py-3 rounded-md transition-colors text-sm no-underline w-full text-left",
        isActive ? "bg-gray-200 font-medium" : "hover:bg-gray-100",
      )}
      style={{
        textDecoration: "none",
        color: isActive ? "#18181B" : "#71717A",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#18181B")}
      onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? "#18181B" : "#71717A")}
    >
      <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
      {label}
    </NavLink>
  );
};

const SidebarNav = ({ items }: { items: SidebarNavConfigItem[] }) => {
  const { t } = useTranslation("common");

  return (
    <nav className="flex-1 py-4 overflow-y-auto">
      <ul className="px-2">
        {items.map((item, index) => (
          <li key={index}>
            <SidebarNavItem item={item} label={t(item.nameKey)} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNav;
