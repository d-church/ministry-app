import { Suspense, type FC } from "react";
import { CContainer } from "@coreui/react";

import { LoadingSpinner } from "../common";

import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Header from "./Header";
import ErrorBoundary from "../ErrorBoundary";

const DefaultLayout: FC<{
  content: JSX.Element;
}> = ({ content }) => (
  <div>
    <Sidebar />
    <div className="wrapper d-flex flex-column min-vh-100">
      <Header />

      <div className="body flex-grow-1">
        <CContainer className="px-4" lg>
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>{content}</Suspense>
          </ErrorBoundary>
        </CContainer>
      </div>

      <Footer />
    </div>
  </div>
);

export default DefaultLayout;
