import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import ErrorBoundary from "../components/ErrorBoundary";
import { LoadingSpinner } from "../components/common";

import routes from "./application-routes";

const AppLayout = React.lazy(() => import("../components/AppLayout"));

const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const Page404 = React.lazy(() => import("../pages/Page404"));

const Router = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner fullHeight centered />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/church/*"
              element={
                <AppLayout
                  content={
                    <Routes>
                      {routes.map(
                        (route) =>
                          route.element && (
                            <Route key={route.path} path={route.path} element={route.element} />
                          ),
                      )}
                      <Route path="/" element={<Navigate to="overview" replace />} />
                    </Routes>
                  }
                />
              }
            />

            <Route path="/" element={<Navigate to="church" replace />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default Router;
