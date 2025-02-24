import { use } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import UserConformation from "../features/auth/UserConformation";
import BackButton from "../ui/Buttons/BackButton";

const VerifyAccount = () => {
  const { isAuthenticated } = use(AuthContext);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <BackButton to={"/login/?mode=login"} />
      <div className="w-full h-[80%] flex flex-col items-center justify-center px-9">
        <UserConformation />
      </div>
    </>
  );
};

export default VerifyAccount;
