import { ReactNode, Suspense, use } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Loader from "../Loader";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = use(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login/?mode=login" replace />;
  }

  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default ProtectedRoute;
