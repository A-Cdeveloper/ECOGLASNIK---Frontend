import Error from "../../ui/Error";
import Headline from "../../ui/Headline";
import useVerifyAccount from "./hooks/useVerifyAccount";

const UserConformation = () => {
  const { data, error } = useVerifyAccount();
  let content;
  // //

  if (error) content = <Error message={error.message} />;
  if (data) content = data.message;

  return (
    <>
      <Headline>{content}</Headline>
    </>
  );
};

export default UserConformation;
