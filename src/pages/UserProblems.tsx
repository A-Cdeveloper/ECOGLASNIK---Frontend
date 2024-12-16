import { Navigate, useParams } from "react-router-dom";
import ListProblems from "../features/problems/ListProblems";
import FilterCategory from "../ui/Filters/FilterCategory";
import FilterStatus from "../ui/Filters/FilterStatus";
import useAuth from "../context/useAuth";

const UserProblems = () => {
  const { user } = useAuth();
  const params = useParams();
  const id = params.id as string;

  if (+id !== user?.uid) {
    return Navigate({ to: "/" });
  }

  return (
    <>
      <div className="flex flex-wrap border-t border-b border-secondary-500/40 py-2 mt-2 space-y-2 sm:space-y-0">
        <FilterStatus />
        <FilterCategory />
      </div>
      <ListProblems userId={+id} />
    </>
  );
};

export default UserProblems;
