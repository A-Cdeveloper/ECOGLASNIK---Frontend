import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { uploadProblemImageApi } from "../api/problems";

type uploadImageType = {
  imageUrl: string;
  cid: string;
};

const useUploadImageProblem = (): UseMutationResult<
  uploadImageType,
  Error,
  File
> => {
  const queryClient = useQueryClient();

  const mutation = useMutation<uploadImageType, Error, File>({
    mutationFn: uploadProblemImageApi,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      toast.success("Slika uspešno uploadovana!");
      queryClient.invalidateQueries({ queryKey: ["problem"] });
      queryClient.invalidateQueries({ queryKey: ["problems"] });
      // Optional: to refresh the problems query
    },
    onError: () => {
      toast.error("Došlo je do greške pri uploadovanju slike.");
    },
  });

  return mutation;
};

export default useUploadImageProblem;
