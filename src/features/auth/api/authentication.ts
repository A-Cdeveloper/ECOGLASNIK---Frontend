import { API_URL } from "../../../constants";
import { LoginRegisterResponse, User } from "../../../types";
import { throwError, wait } from "../../../utils/helpers";

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
      const errors: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data?.error.map((err: any) => errors.push(err.message));
      throw new Error(errors.join("\n"));
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
}): Promise<{ message: string }> => {
  try {
    await wait(4000);
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to forgot password: ${response.status} ${response.statusText}`
      );
    }
    return response.json();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`${errorMessage}`);
  }
};

export const verifyAccountApi = async (
  userId: string,
  verificationCode: string
): Promise<User> => {
  try {
    await wait(4000);
    const response = await fetch(
      `${API_URL}/auth/verify/${userId}/${verificationCode}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to veryfy account: ${response.status} ${response.statusText}`
      );
    }
    return response.json();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`${errorMessage}`);
  }
};
