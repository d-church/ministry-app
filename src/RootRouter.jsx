import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { CSpinner, useColorModes } from "@coreui/react";

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./pages/login/Login"));
const Register = React.lazy(() => import("./pages/register/Register"));
const Page404 = React.lazy(() => import("./pages/page404/Page404"));

const RootRouter = () => {
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
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />

          <Route path="/church/*" name="Церква" element={<DefaultLayout />} />
          <Route exact path="/" element={<Navigate to="church" replace />} />
          <Route exact path="*" name="Не знайдено" element={<Page404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default RootRouter;
