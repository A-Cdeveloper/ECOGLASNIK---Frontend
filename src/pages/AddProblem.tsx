import AddProblemBanner from "../features/problems/AddProblemBanner";
import ProblemForm from "../features/problems/ProblemForm";
import { useUrlParams } from "../hooks/useUrlParams";
import BackButton from "../ui/Buttons/BackButton";

const AddProblem = () => {
  const { mapLat, mapLng } = useUrlParams();

  if (!mapLat || !mapLng) {
    return <AddProblemBanner />;
  }

  return (
    <>
      <BackButton />
      <ProblemForm />
    </>
  );
};

export default AddProblem;
