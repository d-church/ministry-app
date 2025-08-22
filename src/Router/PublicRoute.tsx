import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import AccountStore from "../store/AccountStore";
import { HOME_ROUTE } from "../constants";

const PublicRoute = observer(
  ({ children, redirectTo = HOME_ROUTE }: { children: React.ReactNode; redirectTo?: string }) => {
    if (AccountStore.isAuthenticated) {
      return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
  },
);

export default PublicRoute;
