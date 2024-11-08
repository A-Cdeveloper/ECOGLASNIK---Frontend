import { useUser } from "./hooks/useUser";

const User = ({ userId }: { userId: number }) => {
  const { isLoading, user } = useUser(userId);
  return (
    <>
      <div>Korisnik:</div>
      <div>{isLoading ? "Loading..." : user?.name}</div>
    </>
  );
};

export default User;
