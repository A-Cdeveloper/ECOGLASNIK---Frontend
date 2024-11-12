import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const LoginPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <div>Login form</div>;
};

export default LoginPage;
