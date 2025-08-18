import React, { Component, Suspense } from "react";
import type { ReactNode } from "react";
import { CSpinner } from "@coreui/react";

const Page500 = React.lazy(() => import("../pages/Page500"));

class ErrorBoundary extends Component<Props, State> {
  state = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Suspense
          fallback={
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          <Page500 />
        </Suspense>
      );
    }

    return this.props.children;
  }
}

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default ErrorBoundary;
