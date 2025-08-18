import React from "react";
import { useLocation } from "react-router-dom";
import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";

import { routes } from "../../Router";

import "./style.scss";

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname;

  const getRouteConfig = (url: string): RouteConfig | undefined => {
    const routePath = url.startsWith("/church") ? url.replace("/church", "") : url;
    return routes.find((route) => route.path === routePath);
  };

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const asPathWithoutQuery = currentLocation.split("?")[0];

    if (asPathWithoutQuery === "/") {
      const homeRoute = getRouteConfig("/");
      return [{ pathname: "/", name: homeRoute?.name!, active: true }];
    }

    const asPathNestedRoutes = asPathWithoutQuery.split("/").filter((v) => v.length > 0);

    const crumbList: BreadcrumbItem[] = asPathNestedRoutes
      .map((subpath, idx) => {
        const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
        const routeConfig = getRouteConfig(href);

        if (subpath === "church") {
          return null;
        }

        if (!routeConfig?.name) {
          return null;
        }

        return {
          pathname: href,
          name: routeConfig.name,
          active: idx === asPathNestedRoutes.length - 1,
        };
      })
      .filter(Boolean) as BreadcrumbItem[];

    const homeRoute = getRouteConfig("/");
    return [
      { pathname: "/church", name: homeRoute?.name!, active: false },
      ...crumbList,
    ];
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <CBreadcrumb className="ms-2">
      {breadcrumbItems.map((breadcrumb, index) => {
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
