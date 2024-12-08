/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "../../../constants";
import { ExtendedProblem, Problem } from "../../../types";
import { throwError } from "../../../utils/helpers";

export const getAllProblemsApi = async (
  status: string | null,
  cat_id: number | null
): Promise<Problem[]> => {
  let query = "";

  if (status && status != "all") {
    query = `?status=${status}`;
  }

  if (status == "all" || !status) {
    query = "?";
  }

  if (cat_id != null) {
    query = `?cat_id=${cat_id}`;
  }

  if (status && status != "all" && cat_id != null) {
    query = `?status=${status}&cat_id=${cat_id}`;
  }

  try {
    const response = await fetch(
      `${API_URL}/problems${query}&sort=status,createdAt&order=ASC,DESC`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }
    return data.data;
  } catch (error) {
    return await throwError(error);
  }
};

export const getSingleProblemApi = async (
  id: string
): Promise<ExtendedProblem> => {
  try {
    const response = await fetch(`${API_URL}/problems/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    return await throwError(error);
  }
};

export const addNewProblemApi = async (
  newProblem: Problem
): Promise<Problem> => {
  try {
    const response = await fetch(`${API_URL}/problems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProblem),
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

export const updateProblemApi = async (problem: Problem): Promise<Problem> => {
  try {
    const updatedFields = {
      title: problem.title,
      description: problem.description,
      cat_id: problem.cat_id,
      image: problem.image || "",
      pinata_id: problem.pinata_id || "",
      status: problem.status,
    };

    const response = await fetch(`${API_URL}/problems/${problem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
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

export const deleteProblemApi = async (id: string): Promise<Problem> => {
  try {
    const response = await fetch(`${API_URL}/problems/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    // await fetch(`${API_URL}/problems/upload/remove`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ id: data.pinata_id }),
    // });

    return data;
  } catch (error) {
    return await throwError(error);
  }
};

export const uploadProblemImageApi = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/problems/upload`, {
      method: "POST",
      body: formData,
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
