import { use, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Button from "../../ui/Buttons/Button";
import PromptDeleteUser from "../../ui/PromtsAndNotifications/PromptDeleteUser";
import { formattedDate } from "../../utils/helpers";
import useUserProblems from "../problems/hooks/useUserProblems";
import useDeleteUser from "./hooks/useDeleteUser";
import { TranslationContext } from "../../context/translationContext";

const Profile = () => {
  const { user } = use(AuthContext);
  const { t } = use(TranslationContext);

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
        <div>{t("users.first_last_name")}</div>
        <div className="font-bold">
          {user?.firstname + " " + user?.lastname}
        </div>

        <div>{t("users.phone")}</div>
        <div>{user?.phone ? user?.phone : "/"}</div>

        <div>{t("users.email")}</div>
        <div>{user?.email}</div>

        <div>{t("users.role")}</div>
        <div>{user?.role}</div>

        <div>{t("users.creation_date")}</div>
        <div>{user?.createdAt && formattedDate(user?.createdAt)}</div>

        <div>{t("users.updated_date")}</div>
        <div>{user?.updatedAt && formattedDate(user?.updatedAt)}</div>

        <div>{t("users.number_of_user_problems")}</div>
        <div>{numberOfProblems}</div>
      </div>
      {user && user?.role !== "SUPERADMIN" && (
        <div className="flex justify-end">
          <Button
            variation="danger"
            size="small"
            onClick={() => setIsShowWarrning(true)}
          >
            {isLoadingDeleteUser
              ? t("users.delete_user_loading")
              : t("users.delete_user")}
          </Button>
        </div>
      )}
    </>
  );
};

export default Profile;
