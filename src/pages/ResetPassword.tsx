import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import BackButton from "../ui/Buttons/BackButton";
import ResetPasswordForm from "../features/auth/ResetPasswordForm";

const ForgotPassword = () => {
  const { isAuthenticated } = useAuth();
  //   const { mode } = useUrlParams();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <BackButton to={"/login?mode=login"} />
      <div className="w-full h-[80%] flex flex-col items-center justify-center px-9">
        <ResetPasswordForm />
      </div>
    </>
  );
};

export default ForgotPassword;
