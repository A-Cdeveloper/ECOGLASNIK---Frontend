import { use } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import ResetPasswordForm from "../features/auth/ResetPasswordForm";
import BackButton from "../ui/Buttons/BackButton";

const ForgotPassword = () => {
  const { isAuthenticated } = use(AuthContext);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <BackButton to={"/login?mode=login"} />
      <div className="w-full h-[80%] flex flex-col items-center justify-center px-2 sm:px-5 md:px-9">
        <ResetPasswordForm />
      </div>
    </>
  );
};

export default ForgotPassword;
