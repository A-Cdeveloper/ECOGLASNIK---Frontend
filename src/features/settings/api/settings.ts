import { API_URL } from "../../../constants";
import { SettingsType } from "../../../types";
import { throwError } from "../../../utils/helpers";

export const getSettingsApi = async (): Promise<SettingsType> => {
  try {
    const response = await fetch(`${API_URL}/settings`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    return await throwError(error);
  }
};
