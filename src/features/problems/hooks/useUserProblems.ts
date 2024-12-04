import { useMemo } from "react";
import { Problem } from "../../../types";

type ProblemsNumber = {
  userId?: number;
  problems: Problem[] | undefined;
};

const useUserProblems = ({ userId, problems }: ProblemsNumber) => {
  const userProblems = useMemo(() => {
    if (userId) {
      return problems?.filter((problem) => problem.uid === userId);
    }
    return problems;
  }, [problems, userId]);

  return { userProblems, numberOfProblems: userProblems?.length };
};

export default useUserProblems;
