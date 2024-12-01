import Headline from "../../ui/Headline";

const UserInfoRegistration = ({ message }: { message?: string }) => {
  return (
    <>
      <Headline>Vaš nalog je uspešno napravljen.</Headline>
      <p>{message}</p>
    </>
  );
};

export default UserInfoRegistration;
