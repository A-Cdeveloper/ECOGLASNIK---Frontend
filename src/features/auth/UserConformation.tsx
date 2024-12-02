import AuthNotification from "../../ui/AuthNotification";

import useVerifyAccount from "./hooks/useVerifyAccount";

const UserConformation = () => {
  const { data, error } = useVerifyAccount();
  let content;
  // //

  if (error)
    content = <AuthNotification state="error" message={error.message} />;
  if (data)
    content = <AuthNotification state="success" message={data.message} />;

  return <>{content}</>;
};

export default UserConformation;
