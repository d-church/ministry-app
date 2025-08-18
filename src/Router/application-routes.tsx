import React from "react";
import { Navigate } from "react-router-dom";

const Overview = React.lazy(() => import("../pages/home/Overview"));
const Posts = React.lazy(() => import("../pages/home/Posts"));

const routes: {
  path: string;
  nameKey?: string;
  element?: React.JSX.Element;
}[] = [
  { path: "/", nameKey: "navigation.church" },
  { path: "/overview", element: <Overview /> },

  /* Ministries */
  // Website
  { path: "/website", nameKey: "navigation.website", element: <Navigate to="posts" replace /> },
  { path: "/website/posts", nameKey: "navigation.posts", element: <Posts /> },
];

export default routes;
