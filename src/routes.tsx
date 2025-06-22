import React from "react";

const Overview = React.lazy(() => import("./pages/Overview"));
const Posts = React.lazy(() => import("./pages/Posts"));

const routes = [
  { path: "/", exact: true, name: "Церква" },
  { path: "/overview", name: "Церква", element: Overview },
  { path: "/posts", name: "Пости", element: Posts },
];

export default routes;
