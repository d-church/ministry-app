import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

import { AppSidebar, AppFooter, AppHeader } from "../components";

import routes from "../routes";

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <CContainer className="px-4" lg>
            <Suspense fallback={<CSpinner color="primary" />}>
              <Routes>
                {routes.map((route, idx) => {
                  return (
                    route.element && (
                      <Route key={idx} path={route.path} element={<route.element />} />
                    )
                  );
                })}
                <Route path="/" element={<Navigate to="overview" replace />} />
              </Routes>
            </Suspense>
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
