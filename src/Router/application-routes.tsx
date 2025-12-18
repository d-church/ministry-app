import React from "react";
// import { Navigate } from "react-router-dom";

const Profile = React.lazy(() => import("../pages/home/Profile"));
// const Posts = React.lazy(() => import("../pages/home/website/Posts"));
// const CreatePost = React.lazy(() => import("../pages/home/website/CreatePost"));
// const ViewPost = React.lazy(() => import("../pages/home/website/ViewPost"));
// const EditPost = React.lazy(() => import("../pages/home/website/EditPost"));
const DYouthAnnouncements = React.lazy(() => import("../pages/home/website/DYouthAnnouncements"));

const routes: {
  path: string;
  nameKey?: string;
  element?: React.JSX.Element;
}[] = [
  { path: "/", nameKey: "navigation.myChurch" },
  { path: "/profile", element: <Profile /> },

  /* Ministries */
  // Website
  // { path: "/website", nameKey: "navigation.website", element: <Navigate to="posts" replace /> },
  // { path: "/website/posts", nameKey: "navigation.posts", element: <Posts /> },
  // { path: "/website/posts/create", nameKey: "navigation.newPost", element: <CreatePost /> },
  // { path: "/website/posts/:id", nameKey: "navigation.viewPost", element: <ViewPost /> },
  // { path: "/website/posts/:id/edit", nameKey: "navigation.editPost", element: <EditPost /> },
  { path: "/website/dyouth-announcements", nameKey: "navigation.dyouthAnnouncements", element: <DYouthAnnouncements /> },
];

export default routes;
