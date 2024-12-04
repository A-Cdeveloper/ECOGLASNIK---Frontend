import { API_URL } from "../../../constants";
import { User } from "../../../types";
import { throwError } from "../../../utils/helpers";

/// get user from session storage

export const deleteUserApi = async (uid: number): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/users/${uid}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    return await throwError(error);
  }
};
