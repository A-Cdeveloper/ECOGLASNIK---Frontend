import { useQuery } from "@tanstack/react-query";
import { User } from "../../../types";
import { wait } from "../../../utils/timeFunctions";
import { API_URL } from "../../../constants";

export const useUser = (userId: number) => {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery<User>({
    queryKey: ["users", userId],
    queryFn: async () => {
      try {
        await wait(2000);
        const response = await fetch(`${API_URL}/users/${userId}`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch user: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      } catch (error) {
        // Check if the error is an instance of the Error object to get a better message
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        throw new Error(`${errorMessage}`);
      }
    },
    enabled: !!userId,
  });

  return { isLoading, user, error };
};
