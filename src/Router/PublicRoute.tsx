import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import AccountStore from "../stores/AccountStore";
import { HOME_ROUTE } from "../constants";

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * PublicRoute - компонент для публічних маршрутів (логін, реєстрація)
 * Перенаправляє авторизованих користувачів на головну сторінку
 */
const PublicRoute = observer(({ children, redirectTo = HOME_ROUTE }: PublicRouteProps) => {
  if (AccountStore.isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
});

export default PublicRoute;
