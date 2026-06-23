import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/lib/stores/authStore';
import { UserRole } from '@/lib/types';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    /* Redirect users to their appropriate dashboard if they try to access wrong role routes */
    const roleRoutes: Record<UserRole, string> = {
      traveler: '/dashboard',
      partner: '/partner/dashboard',
      admin: '/admin/dashboard',
    };
    return <Navigate to={roleRoutes[user.role]} replace />;
  }

  return <Outlet />;
}
