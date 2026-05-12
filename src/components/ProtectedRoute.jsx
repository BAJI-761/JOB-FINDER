import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { state } = useApp();
  const location = useLocation();

  if (!state.auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && state.auth.role !== requiredRole) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
