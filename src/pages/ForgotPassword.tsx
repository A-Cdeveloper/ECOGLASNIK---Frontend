import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import ForgotPasswordForm from "../features/auth/ForgotPasswordForm";
import BackButton from "../ui/Buttons/BackButton";

const ForgotPassword = () => {
  const { isAuthenticated } = useAuth();
  //   const { mode } = useUrlParams();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <BackButton to={-1} />
      <div className="w-full h-[80%] flex flex-col items-center justify-center px-9">
        <ForgotPasswordForm />
      </div>
    </>
  );
};

export default ForgotPassword;
