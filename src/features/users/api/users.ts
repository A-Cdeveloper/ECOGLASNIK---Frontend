import { User } from "../../../types";
import apiClient from "../../../utils/axios";
import { throwError } from "../../../utils/helpers";

/// get user from session storage

export const deleteUserApi = async (uid: number): Promise<User> => {
  try {
    const response = await apiClient.delete(`/users/${uid}`);
    return response.data;
  } catch (error) {
    return await throwError(error);
  }
};
