import toast from "react-hot-toast";
import { API_URL } from "../../../constants";
import { LoginRegisterResponse } from "../../../types";
import { throwError } from "../../../utils/helpers";

export const loginApi = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginRegisterResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return await throwError(error);
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
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname, lastname, phone, email, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
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
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return await throwError(error);
  }
};

export const verifyAccountApi = async (
  verificationCode: string
): Promise<{ message: string }> => {
  try {
    const response = await fetch(
      `${API_URL}/auth/verify?token=${verificationCode}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
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
    const response = await fetch(
      `${API_URL}/auth/reset-password?token=${verificationCode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return await throwError(error);
  }
};

export const logoutApi = async (): Promise<LoginRegisterResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return await throwError(error);
  }
};

export const autoLogout = (tokenExpiry: Date | null, onLogout: () => void) => {
  if (!tokenExpiry) return;

  const expirationDate = new Date(tokenExpiry);
  const secondsUntilExpiry = Math.floor(
    (expirationDate.getTime() - Date.now()) / 1000
  );

  if (secondsUntilExpiry <= 0) {
    // Token is already expired; log out immediately
    onLogout();
    logoutApi();
    toast.success(`Vaša sessija je istekla! Prijavite se ponovo!`);
  } else {
    // Set a timeout to log out when the token expires
    return setTimeout(() => {
      onLogout();
      logoutApi();
      toast.success(`Vaša sessija je istekla! Prijavite se ponovo!`);
    }, secondsUntilExpiry * 1000);
  }
};
