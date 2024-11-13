import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../../constants";
import { Users } from "../../../types";

export const useUsers = () => {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery<Users>({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch users: ${response.status} ${response.statusText}`
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
  });

  return { isLoading, users, error };
};

export default useUsers;
