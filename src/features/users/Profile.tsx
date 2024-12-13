import { useState } from "react";
import useAuth from "../../context/useAuth";
import Button from "../../ui/Buttons/Button";
import { formattedDate } from "../../utils/helpers";
import useDeleteUser from "./hooks/useDeleteUser";
import PromptDeleteUser from "../../ui/PromtsAndNotifications/PromptDeleteUser";
import useUserProblems from "../problems/hooks/useUserProblems";

const Profile = () => {
  const { user } = useAuth();

  const { numberOfProblems } = useUserProblems({
    userId: user?.uid,
  });

  const { mutate: deleteUserMutation, status: deleteUserStatus } =
    useDeleteUser();

  const [isShowWarrning, setIsShowWarrning] = useState(false);
  const isLoadingDeleteUser = deleteUserStatus === "pending";

  return (
    <>
      {isShowWarrning && (
        <PromptDeleteUser
          status={isShowWarrning}
          numberOfProblems={numberOfProblems || 0}
          onCancel={() => setIsShowWarrning(false)}
          onConfirm={() => deleteUserMutation(Number(user?.uid))}
        />
      )}

      <div className=" bg-secondary-500/30 my-4 py-2 px-3 grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-y-[7px] gap-x-8 text-[14px] rounded-md overflow-hidden break-all">
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

        <div>Broj prijavljenih problema:</div>
        <div>{numberOfProblems}</div>
      </div>
      {user && user?.role !== "superadmin" && (
        <div className="flex justify-end">
          <Button
            variation="danger"
            size="small"
            onClick={() => setIsShowWarrning(true)}
          >
            {isLoadingDeleteUser ? "Brisanje..." : "Obriši nalog"}
          </Button>
        </div>
      )}
    </>
  );
};

export default Profile;
