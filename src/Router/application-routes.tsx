import React from "react";
import { Navigate } from "react-router-dom";

const Overview = React.lazy(() => import("../pages/Overview"));
const Posts = React.lazy(() => import("../pages/Posts"));
const PrayerRequests = React.lazy(() => import("../pages/PrayerRequests"));

const routes: {
  path: string;
  name?: string;
  element?: React.JSX.Element;
}[] = [
  { path: "/overview", element: <Overview /> },

  /* Ministries */
  // Website
  { path: "/website", name: "Вебсайт", element: <Navigate to="/website/posts" replace /> },
  { path: "/website/posts", name: "Пости", element: <Posts /> },

  // Prayer
  { path: "/prayer", name: "Молитва", element: <Navigate to="/prayer/requests" replace /> },
  { path: "/prayer/requests", name: "Молитовні потреби", element: <PrayerRequests /> },
];

export default routes;
