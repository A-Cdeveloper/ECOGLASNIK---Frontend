import toast from "react-hot-toast";
import { LoginRegisterResponse } from "../../../types";
import apiClient from "../../../utils/axios";
import { throwError } from "../../../utils/helpers";
import { t } from "../../../context/translationService";

export const loginApi = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginRegisterResponse> => {
  try {
    const response = await apiClient.post(
      "/auth/login",
      { email, password },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return await throwError(error);
  }
};

export const getUserFromCookies = async () => {
  try {
    const response = await apiClient.get("/auth/get-user-from-cookies", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user data from backend:", error);
    return null;
  }
};

export const registerApi = async ({
  firstname,
  lastname,
  phone,
  email,
  password,
}: {
  firstname: string;
  lastname: string;
  phone?: string;
  email: string;
  password: string;
}): Promise<LoginRegisterResponse> => {
  try {
    const response = await apiClient.post("/auth/register", {
      firstname,
      lastname,
      phone,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    return await throwError(error);
  }
};

export const forgotPasswordApi = async ({
  email,
}: {
  email: string;
}): Promise<LoginRegisterResponse> => {
  try {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    return await throwError(error);
  }
};

export const verifyAccountApi = async (
  verificationCode: string
): Promise<{ message: string }> => {
  try {
    const response = await apiClient.get(`/auth/verify`, {
      params: { token: verificationCode },
    });

    return response.data;
  } catch (error) {
    return await throwError(error);
  }
};

export const resetPasswordApi = async ({
  password,
  verificationCode,
}: {
  password: string;
  verificationCode?: string | null;
}): Promise<{ message: string }> => {
  try {
    const response = await apiClient.post(
      `/auth/reset-password`,
      { password },
      {
        params: { token: verificationCode || "" },
      }
    );

    return response.data;
  } catch (error) {
    return await throwError(error);
  }
};

export const logoutApi = async (
  uid: number
): Promise<LoginRegisterResponse> => {
  try {
    const response = await apiClient.post(
      "/auth/logout",
      { uid },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return await throwError(error);
  }
};

export const autoLogout = (
  tokenExpiry: Date | null,
  onLogout: () => void,
  uid: number
) => {
  if (!tokenExpiry) return;

  const expirationDate = new Date(tokenExpiry);
  const millisecondsUntilExpiry = expirationDate.getTime() - Date.now();

  if (millisecondsUntilExpiry <= 0) {
    // Token is already expired; log out immediately
    handleLogout(onLogout, uid);
  } else {
    // Set a timeout to log out when the token expires
    return setTimeout(
      () => handleLogout(onLogout, uid),
      millisecondsUntilExpiry
    );
  }
};

const handleLogout = async (onLogout: () => void, uid: number) => {
  onLogout();
  await logoutApi(uid);
  toast.success(t("session_expired"));
};
