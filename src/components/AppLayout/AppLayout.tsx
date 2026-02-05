import { Suspense, type FC } from "react";

import { LoadingSpinner } from "../common";
import Sidebar from "./Sidebar";
import ErrorBoundary from "../ErrorBoundary";

const DefaultLayout: FC<{
  content: JSX.Element;
}> = ({ content }) => (
  <div className="flex h-screen bg-white">
    <Sidebar />
    <main className="flex-1 overflow-hidden flex flex-col">
      <div className="p-8 h-full flex flex-col overflow-auto">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>{content}</Suspense>
        </ErrorBoundary>
      </div>
    </main>
  </div>
);

export default DefaultLayout;
