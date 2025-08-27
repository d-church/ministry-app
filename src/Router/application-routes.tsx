import React from "react";
import { Navigate } from "react-router-dom";

const Profile = React.lazy(() => import("../pages/home/Profile"));
const Posts = React.lazy(() => import("../pages/home/website/Posts"));
const CreatePost = React.lazy(() => import("../pages/home/website/CreatePost"));

const routes: {
  path: string;
  nameKey?: string;
  element?: React.JSX.Element;
}[] = [
  { path: "/", nameKey: "navigation.myChurch" },
  { path: "/profile", element: <Profile /> },

  /* Ministries */
  // Website
  { path: "/website", nameKey: "navigation.website", element: <Navigate to="posts" replace /> },
  { path: "/website/posts", nameKey: "navigation.posts", element: <Posts /> },
  { path: "/website/posts/create", nameKey: "navigation.newPost", element: <CreatePost /> },
];

export default routes;
