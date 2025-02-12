import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  return session ? <Navigate to="/home" replace /> : children;
};