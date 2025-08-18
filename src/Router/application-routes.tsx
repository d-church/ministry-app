import React from "react";
import { Navigate } from "react-router-dom";

const Overview = React.lazy(() => import("../pages/home/Overview"));
const Posts = React.lazy(() => import("../pages/home/Posts"));

const routes: {
  path: string;
  name?: string;
  element?: React.JSX.Element;
}[] = [
  { path: "/", name: "Церква" },
  { path: "/overview", element: <Overview /> },

  /* Ministries */
  // Website
  { path: "/website", name: "Вебсайт", element: <Navigate to="posts" replace /> },
  { path: "/website/posts", name: "Пости", element: <Posts /> },
];

export default routes;
