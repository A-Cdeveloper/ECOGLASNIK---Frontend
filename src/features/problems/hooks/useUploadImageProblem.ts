import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { uploadProblemImageApi } from "../api/problems";
import { useState } from "react";

type uploadImageType = {
  imageUrl: string;
  pinata_id: string;
};

type UseUploadImageResult = UseMutationResult<uploadImageType, Error, File> & {
  progress: number;
};

const useUploadImageProblem = (): UseUploadImageResult => {
  const [progress, setProgress] = useState(0);
  const queryClient = useQueryClient();

  const mutation = useMutation<uploadImageType, Error, File>({
    mutationFn: (file: File) => uploadProblemImageApi(file, setProgress),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      toast.success("Slika uspešno uploadovana!");
      setProgress(0);
      queryClient.invalidateQueries({ queryKey: ["problem"] });
      queryClient.invalidateQueries({ queryKey: ["problems"] });
      // Optional: to refresh the problems query
    },
    onError: (data) => {
      setProgress(0);
      toast.error(data.message);
    },
  });

  return {
    ...mutation,
    progress,
  };
};

export default useUploadImageProblem;
