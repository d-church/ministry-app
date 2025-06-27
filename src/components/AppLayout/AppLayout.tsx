import { Suspense, type FC } from "react";
import { CContainer, CSpinner } from "@coreui/react";

import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Header from "./Header";

const DefaultLayout: FC<{
  content: JSX.Element;
}> = ({ content }) => (
  <div>
    <Sidebar />
    <div className="wrapper d-flex flex-column min-vh-100">
      <Header />

      <div className="body flex-grow-1">
        <CContainer className="px-4" lg>
          <Suspense fallback={<CSpinner color="primary" />}>{content}</Suspense>
        </CContainer>
      </div>

      <Footer />
    </div>
  </div>
);

export default DefaultLayout;
