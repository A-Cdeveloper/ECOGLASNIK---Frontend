import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useUrlParams } from "../../../hooks/useUrlParams";
import { Problem } from "../../../types";

const useUserProblems = ({ userId }: { userId?: number }) => {
  const queryClient = useQueryClient();
  const { status, cat_id } = useUrlParams();

  const cachedProblems: Problem[] | undefined = queryClient.getQueryData([
    "problems",
    status,
    cat_id,
  ]);

  const userProblems = useMemo(() => {
    if (userId) {
      return cachedProblems?.filter((problem) => problem.uid === userId);
    }
    return cachedProblems;
  }, [cachedProblems, userId]);

  return { userProblems, numberOfProblems: userProblems?.length };
};

export default useUserProblems;
