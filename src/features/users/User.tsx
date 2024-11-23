import { type User } from "../../types";

const User = ({
  user,
}: {
  user: Pick<User, "firstname" | "lastname" | "email">;
}) => {
  return (
    <>
      <div>Korisnik:</div>
      <div>{user.firstname + " " + user.lastname}</div>
    </>
  );
};

export default User;
