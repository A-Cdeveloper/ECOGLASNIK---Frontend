import { MAX_UPLOAD_FILE_SIZE } from "../../../config";
import { ExtendedProblem, Problem } from "../../../types";
import apiClient from "../../../utils/axios";
import { resizeImage, throwError } from "../../../utils/helpers";

export const getAllProblemsApi = async (
  status: string | null,
  cat_id: number | null
): Promise<Problem[]> => {
  let query = "";

  if (status && status !== "all") {
    query = `?status=${status}`;
  } else if (!status || status === "all") {
    query = "?";
  }

  if (cat_id !== null) {
    query = query.includes("?")
      ? `${query}&cat_id=${cat_id}`
      : `?cat_id=${cat_id}`;
  }

  if (status && status !== "all" && cat_id !== null) {
    query = `?status=${status}&cat_id=${cat_id}`;
  }

  try {
    const response = await apiClient.get(
      `/problems${query}&sort=status,createdAt&order=ASC,DESC`
    );
    return response.data.data;
  } catch (error) {
    return await throwError(error);
  }
};

export const getSingleProblemApi = async (
  id: string
): Promise<ExtendedProblem> => {
  if (!id) {
    return {} as ExtendedProblem;
  }
  try {
    const response = await apiClient.get(`/problems/${id}`);
    return response.data; // Axios automatically parses JSON
  } catch (error) {
    return await throwError(error);
  }
};

export const addNewProblemApi = async (
  newProblem: Problem
): Promise<Problem> => {
  try {
    const response = await apiClient.post("/problems", newProblem, {
      withCredentials: true,
    });
    return response.data;
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

    const response = await apiClient.put(
      `/problems/${problem.id}`,
      updatedFields,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return await throwError(error);
  }
};

export const deleteProblemApi = async (id: string): Promise<Problem> => {
  try {
    const response = await apiClient.delete(`/problems/${id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return await throwError(error);
  }
};

export const uploadProblemImageApi = async (
  file: File,
  onProgress: (progress: number) => void
) => {
  try {
    if (file.size > MAX_UPLOAD_FILE_SIZE) {
      throw new Error("Dozvoljena veličina fotografije je maksimalno 10MB");
    }

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      throw new Error("Fotografija mora biti u JPG ili PNG formatu");
    }

    const resizedFile = await resizeImage(file, 1920);

    const formData = new FormData();
    formData.append("file", resizedFile, file.name);

    const response = await apiClient.post("/problems/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = progressEvent.total
          ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
          : 0;
        onProgress(percentCompleted);
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return await throwError(error);
  }
};
