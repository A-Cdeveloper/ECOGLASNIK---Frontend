import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import UserInfoRegistration from "../features/auth/UserInfoRegistration";
import { useLocation } from "react-router-dom";
import BackButton from "../ui/Buttons/BackButton";

const UserRegistrationInfo = () => {
  const location = useLocation();
  const { message } = location.state || {};
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <BackButton to={"/login/?mode=login"} />
      <div className="w-full h-[80%] flex flex-col items-start justify-center px-9">
        <UserInfoRegistration message={message} />
      </div>
    </>
  );
};

export default UserRegistrationInfo;
