import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { CSpinner } from "@coreui/react";

import routes from "./application-routes";

const AppLayout = React.lazy(() => import("../components/AppLayout"));

const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/register/Register"));
const Page404 = React.lazy(() => import("../pages/page404/Page404"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/church/*"
            element={
              <AppLayout
                content={
                  <Routes>
                    {routes.map((route) => (
                      route.element && <Route key={route.path} path={route.path} element={route.element} />
                    ))}
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
  );
};

export default Router;
