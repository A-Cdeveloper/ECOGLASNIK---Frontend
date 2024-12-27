import { SettingsType } from "../../../types";
import apiClient from "../../../utils/axios";
import { throwError } from "../../../utils/helpers";

export const getSettingsApi = async (): Promise<SettingsType> => {
  try {
    const response = await apiClient.get("/settings");
    return response.data.data;
  } catch (error) {
    return await throwError(error);
  }
};
