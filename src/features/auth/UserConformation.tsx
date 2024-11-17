import { useNavigate } from "react-router-dom";

import useVerifyAccount from "./hooks/useVerifyAccount";
import Headline from "../../ui/Headline";

const UserConformation = () => {
  const navigate = useNavigate();
  const { isLoading, error, user } = useVerifyAccount();

  // console.log(user);

  let content;

  //TODO Verify account
  //
  // if (isLoading) return <Spinner />;
  // if (error) content = <Error message={error.message} />;
  // if (data) content = data.message;

  // const conformed = !!data;
  //if (shownUsers.length === 0) return <Empty resource="users" />;

  if (!user) {
    content = error?.message;
  }
  console.log(error?.message);

  return (
    <>
      <Headline>{content}</Headline>
      {/*{conformed && (
        <Button
          variation="primary"
          size="large"
          onClick={() => navigate("/login")}
        >
          Go to login page
        </Button>
      )} */}
    </>
  );
};

export default UserConformation;
