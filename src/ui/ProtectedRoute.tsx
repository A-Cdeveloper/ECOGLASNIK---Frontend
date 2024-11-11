import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login/?mode=login" replace />;
  }

  return children;
};

export default ProtectedRoute;
