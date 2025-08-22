import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import AccountStore from "../stores/AccountStore";

const ProtectedRoute = observer(
  ({ children, redirectTo = "/login" }: { children: React.ReactNode; redirectTo?: string }) => {
    if (!AccountStore.isAuthenticated) {
      return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
  },
);

export default ProtectedRoute;
