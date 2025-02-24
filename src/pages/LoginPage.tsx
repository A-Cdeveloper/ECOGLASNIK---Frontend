import { use } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import LoginRegisterForm from "../features/auth/LoginRegisterForm";
import { useUrlParams } from "../hooks/useUrlParams";

const LoginPage = () => {
  const { isAuthenticated } = use(AuthContext);
  const { mode } = useUrlParams();

  if (isAuthenticated || !mode) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="w-full h-[100%] flex flex-col items-center justify-center px-2 sm:px-5 md:px-9">
      <LoginRegisterForm mode={mode} />
    </div>
  );
};

export default LoginPage;
