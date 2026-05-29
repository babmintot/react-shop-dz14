import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, checkToken } = useAuth();
  const location = useLocation();

  // 🔹 Если нет токена — перенаправляем на страницу входа
  if (!isAuthenticated || !checkToken()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🔹 Если токен есть — показываем защищённый контент
  return <>{children}</>;
};