import { Suspense, type FC } from "react";
import { CContainer, CSpinner } from "@coreui/react";

import { AppSidebar, AppFooter, AppHeader } from "..";

const DefaultLayout: FC<{
  content: JSX.Element;
}> = ({ content }) => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />

        <div className="body flex-grow-1">
          <CContainer className="px-4" lg>
            <Suspense fallback={<CSpinner color="primary" />}>
              {content}
            </Suspense>
          </CContainer>
        </div>

        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
