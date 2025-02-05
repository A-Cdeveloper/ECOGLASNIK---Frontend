import { Partner } from "../../../types";
import apiClient from "../../../utils/axios";
import { throwError } from "../../../utils/helpers";

export const getPartnersApi = async (): Promise<Partner[]> => {
  try {
    const response = await apiClient.get("/partners");
    return response.data.data; // Axios automatically parses the JSON response
  } catch (error) {
    return await throwError(error);
  }
};
