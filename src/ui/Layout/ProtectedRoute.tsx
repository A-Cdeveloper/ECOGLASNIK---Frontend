import { ReactNode, Suspense } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../context/useAuth";
import Loader from "../Loader";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login/?mode=login" replace />;
  }

  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default ProtectedRoute;
