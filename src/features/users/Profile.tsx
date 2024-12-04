import { useMemo } from "react";
import useAuth from "../../context/useAuth";
import Button from "../../ui/Buttons/Button";
import { formattedDate } from "../../utils/helpers";
import { useProblems } from "../problems/hooks/useProblems";
import useDeleteUser from "./hooks/useDeleteUser";

const Profile = () => {
  const { user } = useAuth();
  const { problems } = useProblems();
  const { mutate: deleteUserMutation, status: deleteUserStatus } =
    useDeleteUser();

  const isLoadingDeleteUser = deleteUserStatus === "pending";

  const userProblemsNumber = useMemo(() => {
    if (user) {
      return problems?.filter((problem) => problem.uid === user.uid).length;
    }
    return;
  }, [problems, user]);

  console.log(userProblemsNumber);

  return (
    <>
      <div className=" bg-secondary/30 my-4 py-2 px-3 grid grid-cols-[max-content_1fr] gap-y-[7px] gap-x-8 text-[14px] rounded-md">
        <div>Ime i prezime:</div>
        <div className="font-bold">
          {user?.firstname + " " + user?.lastname}
        </div>

        <div>Telefon:</div>
        <div>{user?.phone ? user?.phone : "/"}</div>

        <div>Email:</div>
        <div>{user?.email}</div>

        <div>Role:</div>
        <div>{user?.role}</div>

        <div>Nalog kreiran:</div>
        <div>{user?.createdAt && formattedDate(user?.createdAt)}</div>

        <div>Posednja aktivnost:</div>
        <div>{user?.updatedAt && formattedDate(user?.updatedAt)}</div>
      </div>
      {user && user?.role !== "admin" && (
        <div className="flex justify-end">
          <Button
            variation="danger"
            size="small"
            onClick={() => deleteUserMutation(Number(user?.uid))}
          >
            {isLoadingDeleteUser ? "Brisanje..." : "Obriši nalog 🎈"}
          </Button>
        </div>
      )}
    </>
  );
};

export default Profile;
