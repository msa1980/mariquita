import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { ReactNode } from 'react';

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { session, isAdmin } = useAuthStore();
  const location = useLocation();

  if (!session) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    // Redirect to home or a 'not authorized' page if logged in but not an admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
