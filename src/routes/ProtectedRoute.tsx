import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const ProtectedRoute = () => {
  const { session } = useAuth();
  return session ? <Outlet /> : <Navigate to="/login" replace />;
};