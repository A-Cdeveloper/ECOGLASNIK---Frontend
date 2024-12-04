import Profile from "../features/users/Profile";
import BackButton from "../ui/Buttons/BackButton";

export const UserProfile = () => {
  return (
    <>
      <BackButton to={-1} />
      <Profile />
    </>
  );
};
