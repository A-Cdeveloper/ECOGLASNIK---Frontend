import { use } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import ForgotPasswordForm from "../features/auth/ForgotPasswordForm";
import BackButton from "../ui/Buttons/BackButton";

const ForgotPassword = () => {
  const { isAuthenticated } = use(AuthContext);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <BackButton to={-1} />
      <div className="w-full h-[80%] flex flex-col items-center justify-center px-2 sm:px-5 md:px-9">
        <ForgotPasswordForm />
      </div>
    </>
  );
};

export default ForgotPassword;
