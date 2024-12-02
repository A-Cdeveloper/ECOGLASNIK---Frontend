import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import ForgotPasswordForm from "../features/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  const { isAuthenticated } = useAuth();
  //   const { mode } = useUrlParams();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <div className="w-full h-[80%] flex flex-col items-center justify-center px-9">
        <ForgotPasswordForm />
      </div>
    </>
  );
};

export default ForgotPassword;
