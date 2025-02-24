import { use } from "react";
import { AuthContext } from "../context/authContext";
import AddProblemBanner from "../features/problems/AddProblemBanner";
import FormAddEditProblem from "../features/problems/forms/FormAddEditProblem";
import { useUrlParams } from "../hooks/useUrlParams";
import BackButton from "../ui/Buttons/BackButton";

const AddProblem = () => {
  const { mapLat, mapLng } = useUrlParams();
  const { user } = use(AuthContext);

  if (!mapLat || !mapLng) {
    return <AddProblemBanner />;
  }

  return (
    <>
      <BackButton />
      <FormAddEditProblem user={user} />
    </>
  );
};

export default AddProblem;
