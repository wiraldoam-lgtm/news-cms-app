import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export default function ProtectedRoute({ roles }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/" replace />;

  return <Outlet />;
}
