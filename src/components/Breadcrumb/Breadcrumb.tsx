import React from "react";
import { useLocation } from "react-router-dom";
import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";

import { routes } from "../../Router";

import "./style.scss";

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname;

  const getRouteName = (pathname: string, routes: RouteConfig[]): string | false => {
    const currentRoute = routes.find((route: RouteConfig) => route.path === pathname);
    return currentRoute?.name || false;
  };

  const getBreadcrumbs = (location: string): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [];
    location.split("/").reduce((prev: string, curr: string, index: number, array: string[]) => {
      if (curr === "church") return "";
      const currentPathname = `${prev}/${curr}`;
      const routeName = getRouteName(currentPathname, routes);

      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length,
        });
      return currentPathname;
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentLocation);

  return (
    <CBreadcrumb className="breadcrumb my-0">
      <CBreadcrumbItem href="/">Церква</CBreadcrumbItem>

      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        );
      })}
    </CBreadcrumb>
  );
};

interface RouteConfig {
  path: string;
  name?: string;
  element?: React.JSX.Element;
}

interface BreadcrumbItem {
  pathname: string;
  name: string;
  active: boolean;
}

export default React.memo(AppBreadcrumb);
