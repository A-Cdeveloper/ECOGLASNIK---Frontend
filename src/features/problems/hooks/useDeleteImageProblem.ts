// import {
//   UseMutationResult,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";
// import toast from "react-hot-toast";

// import { deleteProblemApi } from "../api/problems";

// const useDeleteImageProblem = (): UseMutationResult<string, Error, File> => {
//   const queryClient = useQueryClient();

//   const mutation = useMutation<string, Error, File>({
//     mutationFn: deleteProblemApi,
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     onSuccess: () => {
//       toast.success("Slika uspešno uploadovana!");
//       queryClient.invalidateQueries({ queryKey: ["problem"] });
//       queryClient.invalidateQueries({ queryKey: ["problems"] });
//       // Optional: to refresh the problems query
//     },
//     onError: (data) => {
//       toast.error(data.message);
//     },
//   });

//   return mutation;
// };

// export default useDeleteImageProblem;
